<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\AcademicPeriodStatus;
use App\Enums\AssessmentCategory;
use App\Enums\AttendanceStatus;
use App\Enums\PeriodAttendanceStatus;
use App\Enums\PeriodGradeStatus;
use App\Models\AcademicPeriod;
use App\Models\Assessment;
use App\Models\AssessmentType;
use App\Models\Attendance;
use App\Models\Enrollment;
use App\Models\LessonRecord;
use App\Models\PeriodAttendance;
use App\Models\PeriodGrade;
use App\Models\School;
use App\Models\SchoolYear;
use App\Models\StudentScore;
use App\Models\TeachingAssignment;
use App\Models\User;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

final class SampleAcademicDataSeeder extends Seeder
{
    public function run(): void
    {
        $school = School::query()->where('cnpj', '12345678000195')->firstOrFail();

        $schoolYear = SchoolYear::query()
            ->where('school_id', $school->id)
            ->where('year', now()->year)
            ->firstOrFail();

        // Usa um usuário admin para registrar as atividades
        $recorder = User::query()
            ->where('school_id', $school->id)
            ->whereHas('roles', fn (Builder $q) => $q->whereIn('name', ['admin', 'teacher']))
            ->first();

        $closedPeriods = AcademicPeriod::query()
            ->where('school_year_id', $schoolYear->id)
            ->where('status', AcademicPeriodStatus::CLOSED)
            ->get();

        if ($closedPeriods->isEmpty()) {
            $this->command->warn('  ⚠ Nenhum período fechado encontrado. Pulando dados acadêmicos de amostra.');

            return;
        }

        $assignments = TeachingAssignment::query()
            ->where('is_active', true)
            ->whereHas('classroom', fn (Builder $q) => $q->where('school_year_id', $schoolYear->id))
            ->with(['classroom.enrollments'])
            ->get();

        $provaType = AssessmentType::query()->where('school_id', $school->id)->where('name', 'Prova Escrita')->first();
        $trabalhoType = AssessmentType::query()->where('school_id', $school->id)->where('name', 'Trabalho Escrito')->first();
        $atividadeType = AssessmentType::query()->where('school_id', $school->id)->where('name', 'Atividade em Sala')->first();

        $assessmentCount = 0;
        $scoreCount = 0;
        $lessonCount = 0;
        $attendanceCount = 0;
        $periodGradeCount = 0;

        foreach ($assignments as $assignment) {
            /** @var Collection<int, Enrollment> $enrollments */
            $enrollments = $assignment->classroom->enrollments;

            if ($enrollments->isEmpty()) {
                continue;
            }

            foreach ($closedPeriods as $period) {
                // Cria 3 avaliações por bimestre por disciplina
                $prova = Assessment::query()->firstOrCreate(
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'academic_period_id'     => $period->id,
                        'name'                   => "Prova - {$period->name}",
                    ],
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'academic_period_id'     => $period->id,
                        'assessment_type_id'     => $provaType?->id,
                        'created_by'             => $recorder?->id,
                        'name'                   => "Prova - {$period->name}",
                        'category'               => AssessmentCategory::REGULAR,
                        'max_score'              => 10.00,
                        'weight'                 => 4.00,
                        'date'                   => $period->end_date->subDays(7)->format('Y-m-d'),
                    ]
                );

                $trabalho = Assessment::query()->firstOrCreate(
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'academic_period_id'     => $period->id,
                        'name'                   => "Trabalho - {$period->name}",
                    ],
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'academic_period_id'     => $period->id,
                        'assessment_type_id'     => $trabalhoType?->id,
                        'created_by'             => $recorder?->id,
                        'name'                   => "Trabalho - {$period->name}",
                        'category'               => AssessmentCategory::REGULAR,
                        'max_score'              => 10.00,
                        'weight'                 => 3.00,
                        'date'                   => $period->start_date->addDays(30)->format('Y-m-d'),
                    ]
                );

                $atividade = Assessment::query()->firstOrCreate(
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'academic_period_id'     => $period->id,
                        'name'                   => "Atividade - {$period->name}",
                    ],
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'academic_period_id'     => $period->id,
                        'assessment_type_id'     => $atividadeType?->id,
                        'created_by'             => $recorder?->id,
                        'name'                   => "Atividade - {$period->name}",
                        'category'               => AssessmentCategory::REGULAR,
                        'max_score'              => 10.00,
                        'weight'                 => 3.00,
                        'date'                   => $period->start_date->addDays(15)->format('Y-m-d'),
                    ]
                );

                $assessmentCount += 3;

                // Cria 1 registro de aula para gerar presenças
                $lessonDate = $period->start_date->addDays(5)->format('Y-m-d');

                $lessonRecord = LessonRecord::query()->firstOrCreate(
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'lesson_date'            => $lessonDate,
                    ],
                    [
                        'teaching_assignment_id' => $assignment->id,
                        'recorded_by'            => $recorder?->id,
                        'lesson_date'            => $lessonDate,
                        'lessons_given'          => 2,
                        'recorded_at'            => now(),
                    ]
                );

                $lessonCount++;

                // Lança notas e presenças para cada aluno matriculado
                foreach ($enrollments as $enrollment) {
                    // Notas
                    foreach ([$prova, $trabalho, $atividade] as $assessment) {
                        $alreadyScored = StudentScore::query()
                            ->where('enrollment_id', $enrollment->id)
                            ->where('assessment_id', $assessment->id)
                            ->exists();

                        if (! $alreadyScored) {
                            StudentScore::query()->create([
                                'assessment_id' => $assessment->id,
                                'enrollment_id' => $enrollment->id,
                                'created_by'    => $recorder?->id,
                                'score'         => fake()->randomFloat(2, 4.0, 10.0),
                            ]);
                            $scoreCount++;
                        }
                    }

                    // Presenças
                    $alreadyAttended = Attendance::query()
                        ->where('lesson_record_id', $lessonRecord->id)
                        ->where('enrollment_id', $enrollment->id)
                        ->exists();

                    if (! $alreadyAttended) {
                        $status = fake()->randomElement([
                            AttendanceStatus::PRESENT,
                            AttendanceStatus::PRESENT,
                            AttendanceStatus::PRESENT,
                            AttendanceStatus::ABSENT,
                        ]);

                        Attendance::query()->create([
                            'lesson_record_id' => $lessonRecord->id,
                            'enrollment_id'    => $enrollment->id,
                            'recorded_by'      => $recorder?->id,
                            'status'           => $status,
                        ]);

                        $attendanceCount++;
                    }
                }

                // Cria PeriodGrades consolidados para os períodos fechados
                foreach ($enrollments as $enrollment) {
                    $exists = PeriodGrade::query()
                        ->where('enrollment_id', $enrollment->id)
                        ->where('teaching_assignment_id', $assignment->id)
                        ->where('academic_period_id', $period->id)
                        ->exists();

                    if ($exists) {
                        continue;
                    }

                    $calculatedGrade = fake()->randomFloat(2, 5.0, 10.0);
                    $finalGrade = $calculatedGrade;
                    $status = $calculatedGrade >= 6.0
                        ? PeriodGradeStatus::PASSING
                        : PeriodGradeStatus::FAILED;

                    PeriodGrade::query()->create([
                        'enrollment_id'          => $enrollment->id,
                        'teaching_assignment_id' => $assignment->id,
                        'academic_period_id'     => $period->id,
                        'calculated_grade'       => $calculatedGrade,
                        'recovery_grade'         => null,
                        'final_grade'            => $finalGrade,
                        'status'                 => $status,
                        'is_locked'              => true,
                        'locked_at'              => now(),
                        'calculation_snapshot'   => [
                            'formula'       => 'weighted_avg',
                            'calculated_at' => now()->toISOString(),
                        ],
                    ]);

                    // PeriodAttendance consolidado
                    $totalClasses = 20;
                    $attendedClasses = fake()->numberBetween(14, 20);
                    $absences = $totalClasses - $attendedClasses;
                    $percentage = round(($attendedClasses / $totalClasses) * 100, 2);

                    PeriodAttendance::query()->firstOrCreate(
                        [
                            'enrollment_id'          => $enrollment->id,
                            'teaching_assignment_id' => $assignment->id,
                            'academic_period_id'     => $period->id,
                        ],
                        [
                            'enrollment_id'          => $enrollment->id,
                            'teaching_assignment_id' => $assignment->id,
                            'academic_period_id'     => $period->id,
                            'total_classes'          => $totalClasses,
                            'attended_classes'       => $attendedClasses,
                            'justified_absences'     => 0,
                            'unjustified_absences'   => $absences,
                            'attendance_percentage'  => $percentage,
                            'status'                 => $percentage >= 75.0
                                ? PeriodAttendanceStatus::SUFFICIENT
                                : PeriodAttendanceStatus::INSUFFICIENT,
                            'is_locked' => true,
                            'locked_at' => now(),
                        ]
                    );

                    $periodGradeCount++;
                }
            }
        }

        $this->command->info("  ✔ {$assessmentCount} avaliações criadas");
        $this->command->info("  ✔ {$lessonCount} registros de aula criados");
        $this->command->info("  ✔ {$scoreCount} notas lançadas");
        $this->command->info("  ✔ {$attendanceCount} presenças registradas");
        $this->command->info("  ✔ {$periodGradeCount} notas/frequências bimestrais consolidadas");
    }
}
