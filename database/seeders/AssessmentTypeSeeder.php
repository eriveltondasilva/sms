<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AssessmentType;
use App\Models\School;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

final class AssessmentTypeSeeder extends Seeder
{
    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        $types = [
            [
                'name'        => 'Prova Escrita',
                'description' => 'Avaliação escrita individual',
                'max_score'   => 10.00,
                'weight'      => 4.00,
            ],
            [
                'name'        => 'Trabalho Escrito',
                'description' => 'Trabalho individual ou em grupo',
                'max_score'   => 10.00,
                'weight'      => 3.00,
            ],
            [
                'name'        => 'Atividade em Sala',
                'description' => 'Exercícios e participação em sala',
                'max_score'   => 10.00,
                'weight'      => 3.00,
            ],
            [
                'name'        => 'Recuperação Bimestral',
                'description' => 'Prova de recuperação ao final do bimestre',
                'max_score'   => 10.00,
                'weight'      => 1.00,
            ],
        ];

        foreach ($types as $data) {
            AssessmentType::query()->firstOrCreate(
                ['school_id' => $school->id, 'name' => $data['name']],
                array_merge($data, ['school_id' => $school->id, 'is_active' => true])
            );
        }

        $this->command->info('  ✔ ' . count($types) . ' tipos de avaliação criados');
    }
}
