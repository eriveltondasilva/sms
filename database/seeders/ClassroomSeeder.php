<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ClassroomShift;
use App\Models\Classroom;
use App\Models\GradeLevel;
use App\Models\OfferedGradeLevel;
use App\Models\School;
use App\Models\SchoolYear;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

final class ClassroomSeeder extends Seeder
{
    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        /** @var SchoolYear $schoolYear */
        $schoolYear = Context::get('school_year');

        Teacher::query()
            ->where('school_id', $school->id)
            ->where('is_active', true)
            ->get();

        $classrooms = [
            ['grade_code' => 'EF06', 'name' => '6º A', 'shift' => ClassroomShift::MORNING,   'room' => 'Sala 01'],
            ['grade_code' => 'EF07', 'name' => '7º A', 'shift' => ClassroomShift::MORNING,   'room' => 'Sala 02'],
            ['grade_code' => 'EF08', 'name' => '8º A', 'shift' => ClassroomShift::AFTERNOON, 'room' => 'Sala 03'],
            ['grade_code' => 'EF09', 'name' => '9º A', 'shift' => ClassroomShift::AFTERNOON, 'room' => 'Sala 04'],
        ];

        foreach ($classrooms as $data) {
            $gradeLevel = GradeLevel::query()->where('code', $data['grade_code'])->firstOrFail();

            $offeredGradeLevel = OfferedGradeLevel::query()->firstOrFail([
                'school_id'      => $school->id,
                'grade_level_id' => $gradeLevel->id,
            ]);

            Classroom::query()->firstOrCreate(
                [
                    'school_year_id'         => $schoolYear->id,
                    'offered_grade_level_id' => $offeredGradeLevel->id,
                    'name'                   => $data['name'],
                ],
                [
                    'school_year_id'         => $schoolYear->id,
                    'offered_grade_level_id' => $offeredGradeLevel->id,
                    'main_teacher_id'        => null,
                    'name'                   => $data['name'],
                    'room'                   => $data['room'],
                    'shift'                  => $data['shift'],
                    'student_max'            => 35,
                    'is_active'              => true,
                ]
            );
        }

        $this->command->info('  ✔ ' . count($classrooms) . ' turmas criadas');
    }
}
