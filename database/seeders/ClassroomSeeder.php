<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ClassroomShift;
use App\Models\Classroom;
use App\Models\GradeLevel;
use App\Models\OfferedGradeLevel;
use App\Models\School;
use App\Models\SchoolYear;
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

        $classrooms = [
            ['grade_code' => 'EF06', 'name' => '6º A',   'room' => 'Sala 01'],
            ['grade_code' => 'EF07', 'name' => '7º A',   'room' => 'Sala 02'],
            ['grade_code' => 'EF08', 'name' => '8º A', 'room' => 'Sala 03'],
            ['grade_code' => 'EF09', 'name' => '9º A', 'room' => 'Sala 04'],
        ];

        $codes = array_column($classrooms, 'grade_code');

        $gradeLevels = GradeLevel::query()
            ->whereIn('code', $codes)
            ->get()
            ->keyBy('code');

        $offeredGradeLevels = OfferedGradeLevel::query()
            ->where('school_id', $school->id)
            ->whereIn('grade_level_id', $gradeLevels->pluck('id'))
            ->get()
            ->keyBy('grade_level_id');

        foreach ($classrooms as $data) {
            $gradeLevel = $gradeLevels->get($data['grade_code']);
            $offeredGradeLevel = $offeredGradeLevels->get($gradeLevel->id);

            Classroom::query()->firstOrCreate(
                [
                    'school_year_id'         => $schoolYear->id,
                    'offered_grade_level_id' => $offeredGradeLevel->id,
                    'name'                   => $data['name'],
                ],
                [
                    'school_year_id'         => $schoolYear->id,
                    'offered_grade_level_id' => $offeredGradeLevel->id,
                    'name'                   => $data['name'],
                    'room'                   => $data['room'],
                    'shift'                  => ClassroomShift::AFTERNOON,
                    'student_max'            => 35,
                    'is_active'              => true,
                ]
            );
        }

        $this->command->info('  ✔ ' . count($classrooms) . ' turmas criadas');
    }
}
