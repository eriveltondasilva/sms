<?php

declare(strict_types=1);

use App\Enums\PeriodAttendanceStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Snapshot consolidado da FREQUÊNCIA de um aluno em uma disciplina num bimestre.
 *
 * Gerado pelo AttendanceConsolidationService ao fechar um AcademicPeriod.
 * Separado de period_grades intencionalmente:
 *
 * - Frequência é atualizada DIARIAMENTE (a cada aula registrada)
 * - Notas são atualizadas POR AVALIAÇÃO (menos frequente)
 * - Ciclos de vida distintos = tabelas separadas = recálculos isolados
 *
 * FONTE DOS DADOS:
 * lesson_records (aulas dadas) + attendances (presenças/faltas)
 * → consolida em period_attendances ao fechar o período
 */
return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('period_attendances', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('enrollment_id')->constrained()->restrictOnDelete();
            $table->foreignId('teaching_assignment_id')->constrained()->restrictOnDelete();
            $table->foreignId('academic_period_id')->constrained()->restrictOnDelete();

            // Total de aulas dadas na disciplina neste período
            $table->unsignedSmallInteger('total_classes')->default(0);

            // Aulas que o aluno esteve presente (inclui justificadas se a escola contar)
            $table->unsignedSmallInteger('attended_classes')->default(0);

            // Faltas com justificativa (atestado médico, etc)
            $table->unsignedSmallInteger('justified_absences')->default(0);

            // Faltas sem justificativa
            $table->unsignedSmallInteger('unjustified_absences')->default(0);

            // (attended_classes / total_classes) * 100
            $table->decimal('attendance_percentage', 5, 2)->default(0.00);

            // sufficient: attendance_percentage >= min_attendance_percentage
            // insufficient: abaixo do mínimo
            $table->string('status', 50)->default(PeriodAttendanceStatus::SUFFICIENT->value);

            // true ao fechar o período: registro não pode mais ser alterado
            $table->boolean('is_locked')->default(false);
            $table->timestamp('locked_at')->nullable();

            $table->timestamps();

            $table->unique(
                ['enrollment_id', 'teaching_assignment_id', 'academic_period_id'],
                'unq_period_attendance'
            );

            $table->index(['academic_period_id', 'status']);
            $table->index(['teaching_assignment_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('period_attendances');
    }
};
