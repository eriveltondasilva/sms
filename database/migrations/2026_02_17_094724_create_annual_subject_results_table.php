<?php

declare(strict_types=1);

use App\Enums\SubjectFinalResult;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Resultado final consolidado do aluno em uma disciplina no ano letivo.
 *
 * Une notas e frequência intencionalmente: é o documento final oficial,
 * onde os dois critérios de aprovação precisam estar juntos para determinar
 * o resultado (approved | failed_by_grade | failed_by_attendance | failed_both).
 *
 * DIFERENÇA em relação às tabelas de período:
 * - period_grades: só notas (atualização por avaliação)
 * - period_attendances: só frequência (atualização diária)
 * - annual_subject_results: ambos (documento final, gerado 1x ao fechar o ano)
 *
 * CICLO DE VIDA:
 * 1. Todos os períodos fechados → job consolida annual_subject_results
 * 2. final_result = 'failed_by_grade' + allows_final_exam → aluno faz exame final
 * 3. Exame final lançado → job recalcula com final_exam_grade
 * 4. Coordenador aprova resultados → is_locked = true
 *
 * PERIOD_GRADES_SNAPSHOT:
 * Armazena as notas de cada período diretamente no JSON para:
 * - Evitar join com period_grades em relatórios e boletins
 * - Preservar o histórico exato do momento do fechamento
 * Exemplo: {"1": 8.50, "2": 8.20, "3": 7.00, "4": 6.50}
 */
return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('annual_subject_results', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('enrollment_id')->constrained()->restrictOnDelete();
            $table->foreignId('teaching_assignment_id')->constrained()->restrictOnDelete();
            $table->foreignId('school_year_id')->constrained()->restrictOnDelete();

            // NOTAS
            // Snapshot das notas finais de cada período: {"1": 8.5, "2": 8.2, ...}
            // A chave é o order do academic_period
            $table->json('period_grades_snapshot');

            // Quantidade de períodos considerados no cálculo
            $table->unsignedTinyInteger('periods_count');

            // Resultado da fórmula anual configurada:
            // - sum: 8.5 + 8.2 + 7.0 + 6.5 = 30.2
            // - simple_avg: 30.2 / 4 = 7.55
            $table->decimal('calculated_total', 6, 2);

            // Sempre a média (calculado_total / periods_count)
            // Independente da fórmula: útil para exibição no boletim
            $table->decimal('calculated_average', 5, 2);

            // Nota do exame final (nullable: só preenchido se fez exame)
            $table->decimal('final_exam_grade', 5, 2)->nullable();

            // Nota final após aplicar o método de recuperação anual (se fez exame)
            // Se não fez exame: final_total = calculated_total
            $table->decimal('final_total', 6, 2);

            // Média final (final_total / periods_count)
            $table->decimal('final_average', 5, 2);

            // FREQUÊNCIA
            $table->unsignedSmallInteger('total_classes')->default(0);
            $table->unsignedSmallInteger('attended_classes')->default(0);
            $table->unsignedSmallInteger('justified_absences')->default(0);
            $table->unsignedSmallInteger('unjustified_absences')->default(0);
            $table->decimal('attendance_percentage', 5, 2)->default(0.00);

            // RESULTADO FINAL
            // approved: nota e frequência suficientes
            // failed_by_grade: nota insuficiente (frequência OK → pode ter exame)
            // failed_by_attendance: frequência insuficiente (nota OK → sem exame)
            // failed_both: ambos insuficientes
            $table->string('final_result', 30)->default(SubjectFinalResult::APPROVED->value);

            // true após coordenador aprovar os resultados finais
            $table->boolean('is_locked')->default(false);
            $table->timestamp('locked_at')->nullable();

            // Snapshot do cálculo para rastreabilidade
            // {
            //   "annual_formula": "sum",
            //   "min_passing_score": 24.0,
            //   "min_attendance_percentage": 75.0,
            //   "allows_final_exam": true,
            //   "final_exam_formula": "average",
            //   "calculated_at": "2024-12-20T10:00:00Z"
            // }
            $table->json('calculation_snapshot')->nullable();

            $table->timestamps();

            $table->unique(
                ['enrollment_id', 'teaching_assignment_id', 'school_year_id'],
                'unq_annual_subject_result'
            );

            $table->index(['school_year_id', 'final_result']);
            $table->index(['teaching_assignment_id', 'final_result']);
            $table->index(['enrollment_id', 'final_result']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('annual_subject_results');
    }
};
