<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Enums\SubjectEnum;
use App\Models\Subject;

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

        foreach ($subjectsData as $data) {
            Subject::create($data);
        }
    }
}
