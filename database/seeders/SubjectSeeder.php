<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\SubjectEnum;
use App\Models\AcademicYear;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjectsData = [
            [
                'name' => SubjectEnum::PORTUGUESE->value,
                'abbr' => SubjectEnum::PORTUGUESE->abbr(),
            ],
            [
                'name' => SubjectEnum::MATHEMATICS->value,
                'abbr' => SubjectEnum::MATHEMATICS->abbr(),
            ],
            [
                'name' => SubjectEnum::HISTORY->value,
                'abbr' => SubjectEnum::HISTORY->abbr(),
            ],
            [
                'name' => SubjectEnum::GEOGRAPHY->value,
                'abbr' => SubjectEnum::GEOGRAPHY->abbr(),
            ],
            [
                'name' => SubjectEnum::ARTS->value,
                'abbr' => SubjectEnum::ARTS->abbr(),
            ],
        ];

        Subject::insert($subjectsData);

        $activeYearId = AcademicYear::IsActive()->id;

        $subjects = Subject::all();

        $subjects->each(function ($subject) use ($activeYearId) {
            $subject->teachers()->attach([1,2], ['academic_year_id' => $activeYearId]);
        });
    }
}
