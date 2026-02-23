<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\EnrollmentStatus;
use App\Enums\StudentStatus;
use App\Models\Classroom;
use App\Models\Enrollment;
use App\Models\School;
use App\Models\SchoolYear;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

final class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        /** @var SchoolYear $schoolYear */
        $schoolYear = Context::get('school_year');

        $classrooms = Classroom::query()
            ->where('school_year_id', $schoolYear->id)
            ->where('is_active', true)
            ->get();

        $students = Student::query()
            ->where('school_id', $school->id)
            ->where('status', StudentStatus::ACTIVE)
            ->get();

        $enrolledAt = "{$schoolYear->year}-02-03";
        $count = 0;
        $classIndex = 0;

        foreach ($students as $student) {
            // Distribui os alunos nas turmas em round-robin
            $classroom = $classrooms->get($classIndex % $classrooms->count());
            $classIndex++;

            // Verifica se já tem matrícula ativa neste ano (respeita constraint parcial)
            $alreadyEnrolled = Enrollment::query()
                ->where('student_id', $student->id)
                ->where('school_year_id', $schoolYear->id)
                ->where('status', EnrollmentStatus::ACTIVE)
                ->exists();

            if ($alreadyEnrolled) {
                continue;
            }

            Enrollment::query()->create([
                'student_id'     => $student->id,
                'classroom_id'   => $classroom->id,
                'school_year_id' => $schoolYear->id,
                'status'         => EnrollmentStatus::ACTIVE,
                'enrolled_at'    => $enrolledAt,
            ]);

            $count++;
        }

        $this->command->info("  ✔ {$count} matrículas criadas");
    }
}
