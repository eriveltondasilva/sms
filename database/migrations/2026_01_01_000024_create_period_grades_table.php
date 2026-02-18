<?php

declare(strict_types=1);

use App\Enums\PeriodGradeStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Snapshot consolidado das NOTAS de um aluno em uma disciplina num bimestre.
 *
 * Gerado pelo GradeConsolidationService ao fechar um AcademicPeriod.
 * Após is_locked = true, o registro é imutável (enforced na camada de serviço).
 *
 * CICLO DE VIDA:
 * 1. Período aberto: professor lança notas em student_scores
 * 2. Coordenador fecha o período: job calcula e cria/atualiza period_grades
 * 3. Aluno em recuperação: assessment com category = 'period_recovery' é lançada
 * 4. Job recalcula: atualiza recovery_grade e final_grade
 * 5. Prazo encerrado: is_locked = true, registro congelado
 *
 * SEPARAÇÃO DE RESPONSABILIDADES:
 * - period_grades: apenas notas (esta tabela)
 * - period_attendances: apenas frequência (tabela separada)
 * Motivo: ciclos de atualização distintos (notas por avaliação, frequência por aula)
 */
return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('period_grades', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('enrollment_id')->constrained()->restrictOnDelete();
            $table->foreignId('teaching_assignment_id')->constrained()->restrictOnDelete();
            $table->foreignId('academic_period_id')->constrained()->restrictOnDelete();

            // Nota calculada a partir das avaliações regulares/substitutivas
            // Resultado da fórmula configurada (weighted_avg ou simple_avg)
            $table->decimal('calculated_grade', 5, 2);

            // Nota obtida na avaliação de recuperação (nullable se não fez)
            $table->decimal('recovery_grade', 5, 2)->nullable();

            // Nota final após aplicar o método de recuperação configurado
            // Se não fez recuperação: final_grade = calculated_grade
            $table->decimal('final_grade', 5, 2);

            // passing: final_grade >= min_period_score
            // needs_recovery: calculated_grade < min_period_score, aguardando recuperação
            // failed: não fez recuperação ou não atingiu mínimo após recuperação
            $table->string('status', 30)->default(PeriodGradeStatus::NEEDS_RECOVERY->value);

            // true após o prazo de recuperação encerrar: registro não pode mais ser alterado
            $table->boolean('is_locked')->default(false);
            $table->timestamp('locked_at')->nullable();

            // Snapshot do cálculo para rastreabilidade e auditoria
            // Exemplo:
            // {
            //   "formula": "weighted_avg",
            //   "assessments": [
            //     {"id": 1, "score": 8.5, "weight": 4.0, "category": "regular"},
            //     {"id": 2, "score": 9.0, "weight": 3.0, "category": "regular"},
            //     {"id": 3, "score": 7.0, "weight": 3.0, "category": "makeup"}
            //   ],
            //   "recovery_assessment_id": 4,
            //   "recovery_method": "best_score",
            //   "calculated_at": "2024-05-20T10:00:00Z"
            // }
            $table->json('calculation_snapshot')->nullable();

            $table->timestamps();

            $table->unique(
                ['enrollment_id', 'teaching_assignment_id', 'academic_period_id'],
                'unq_period_grade'
            );

            $table->index(['academic_period_id', 'status']);
            $table->index(['teaching_assignment_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('period_grades');
    }
};
