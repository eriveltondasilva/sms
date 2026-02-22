<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\School;
use App\Models\Subject;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

final class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        $subjects = [
            ['name' => 'Língua Portuguesa',   'code' => 'PORT', 'week_hours' => 5],
            ['name' => 'Matemática',           'code' => 'MAT',  'week_hours' => 5],
            ['name' => 'História',             'code' => 'HIST', 'week_hours' => 2],
            ['name' => 'Geografia',            'code' => 'GEO',  'week_hours' => 2],
            ['name' => 'Ciências',             'code' => 'CIEN', 'week_hours' => 3],
            ['name' => 'Língua Inglesa',       'code' => 'ING',  'week_hours' => 2],
            ['name' => 'Educação Física',      'code' => 'EDF',  'week_hours' => 2],
            ['name' => 'Artes',                'code' => 'ART',  'week_hours' => 1],
        ];

        foreach ($subjects as $data) {
            Subject::query()->firstOrCreate(
                ['school_id' => $school->id, 'code' => $data['code']],
                array_merge($data, ['school_id' => $school->id, 'is_active' => true])
            );
        }

        $this->command->info('  ✔ ' . count($subjects) . ' disciplinas criadas');
    }
}
