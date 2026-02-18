<?php

declare(strict_types=1);

use App\Enums\AnnualFormulaType;
use App\Enums\PeriodFormulaType;
use App\Enums\RecoveryMethod;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Configurações pedagógicas e de avaliação de um ano letivo.
 *
 * Relacionamento 1:1 com school_years.
 * Centraliza todas as regras de cálculo e aprovação configuráveis por escola/ano.
 *
 * FÓRMULAS DE PERÍODO (como calcular a nota do bimestre a partir das avaliações):
 * - weighted_avg: Média ponderada usando os pesos das avaliações
 * - simple_avg: Média aritmética simples
 *
 * FÓRMULAS ANUAIS (como calcular a nota final a partir dos bimestres):
 * - sum: Soma dos bimestres. Ex: 8.5 + 8.2 + 7.0 + 6.5 = 30.2 (de 40)
 *   → min_passing_score deve ser configurado como 24.0 (padrão brasileiro)
 * - simple_avg: Média dos bimestres. Ex: 30.2 / 4 = 7.55 (de 10)
 *   → min_passing_score deve ser configurado como 6.0
 * - weighted_avg: Ponderada pelos pesos dos academic_periods.
 *
 * MÉTODOS DE RECUPERAÇÃO:
 * - best_score: Usa a maior nota entre original e recuperação
 * - average: Calcula a média entre original e recuperação
 * - replace: Substitui completamente pela nota de recuperação
 */
return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('school_year_configs', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('school_year_id')->unique()->constrained()->cascadeOnDelete();

            // Como calcular a nota do bimestre a partir das avaliações
            $table->string('period_formula_type', 50)->default(PeriodFormulaType::DEFAULT);

            // Como calcular a nota anual a partir das notas dos bimestres
            $table->string('annual_formula_type', 50)->default(AnnualFormulaType::DEFAULT);

            // Como aplicar a nota da recuperação de bimestre
            $table->string('period_recovery_method', 50)->default(RecoveryMethod::DEFAULT);

            // Como aplicar a nota do exame final
            $table->string('annual_recovery_method', 50)->default(RecoveryMethod::AVERAGE->value);

            // Nota mínima para aprovação no ano.
            // Depende da annual_formula_type:
            // - sum: 24.0 (padrão: 60% de 40 pontos em 4 bimestres)
            // - simple_avg ou weighted_avg: 6.0 (60% de 10)
            $table->decimal('min_passing_score', 5, 2)->default(24.00);

            // Nota mínima por bimestre para evitar recuperação (escala 0-10)
            $table->decimal('min_period_score', 4, 2)->default(6.00);

            // Frequência mínima obrigatória por lei (LDB Art. 24)
            $table->decimal('min_attendance_percentage', 5, 2)->default(75.00);

            // Aluno reprovado por nota (mas com frequência OK) tem direito ao exame final
            $table->boolean('allows_final_exam')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_year_configs');
    }
};
