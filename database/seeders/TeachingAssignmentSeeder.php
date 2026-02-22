<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\School;
use App\Models\SchoolYear;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TeachingAssignment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

final class TeachingAssignmentSeeder extends Seeder
{
    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        /** @var SchoolYear $schoolYear */
        $schoolYear = Context::get('school_year');

        $classrooms = Classroom::query()
            ->where('school_year_id', $schoolYear->id)
            ->get();

        $teachers = Teacher::query()
            ->where('school_id', $school->id)
            ->where('is_active', true)
            ->get();

        // Mapa: código da disciplina → índice do professor responsável
        $subjectTeacherMap = [
            'PORT' => 0,
            'MAT'  => 1,
            'CIEN' => 2,
            'HIST' => 3,
            'GEO'  => 3,
            'ING'  => 0,
        ];

        // Disciplinas que serão atribuídas a cada turma
        $subjectCodes = array_keys($subjectTeacherMap);

        $subjects = Subject::query()
            ->where('school_id', $school->id)
            ->whereIn('code', $subjectCodes)
            ->get()
            ->keyBy('code');

        $startDate = "{$schoolYear->year}-02-03";
        $endDate = "{$schoolYear->year}-12-19";
        $count = 0;

        foreach ($classrooms as $classroom) {
            foreach ($subjectCodes as $code) {
                $subject = $subjects->get($code);
                $teacher = $teachers->get($subjectTeacherMap[$code] % $teachers->count());

                if (! $subject) {
                    continue;
                }

                TeachingAssignment::query()->firstOrCreate(
                    [
                        'classroom_id' => $classroom->id,
                        'subject_id'   => $subject->id,
                    ],
                    [
                        'classroom_id'        => $classroom->id,
                        'subject_id'          => $subject->id,
                        'teacher_id'          => $teacher?->id,
                        'workload_hours'      => $subject->week_hours * 40,
                        'total_classes_given' => 0,
                        'start_date'          => $startDate,
                        'end_date'            => $endDate,
                        'is_active'           => true,
                    ]
                );

                $count++;
            }
        }

        $this->command->info("  ✔ {$count} atribuições de ensino criadas");
    }
}
