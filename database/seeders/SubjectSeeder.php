<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Enums\SubjectsEnum;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        foreach (SubjectsEnum::cases() as $subject) {
            Subject::create([
                'name' => $subject->value,
                'abbr' => $subject->abbr(),
            ]);
        }
    }
}
