<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\GradeLevel;
use Illuminate\Database\Seeder;

final class GradeLevelSeeder extends Seeder
{
    public function run(): void
    {
        $gradeLevels = [
            // Ensino Fundamental I
            ['name' => '1º Ano',  'stage' => 'Ensino Fundamental I', 'code' => 'EF01', 'order' => 1],
            ['name' => '2º Ano',  'stage' => 'Ensino Fundamental I', 'code' => 'EF02', 'order' => 2],
            ['name' => '3º Ano',  'stage' => 'Ensino Fundamental I', 'code' => 'EF03', 'order' => 3],
            ['name' => '4º Ano',  'stage' => 'Ensino Fundamental I', 'code' => 'EF04', 'order' => 4],
            ['name' => '5º Ano',  'stage' => 'Ensino Fundamental I', 'code' => 'EF05', 'order' => 5],
            // Ensino Fundamental II
            ['name' => '6º Ano',  'stage' => 'Ensino Fundamental II', 'code' => 'EF06', 'order' => 6],
            ['name' => '7º Ano',  'stage' => 'Ensino Fundamental II', 'code' => 'EF07', 'order' => 7],
            ['name' => '8º Ano',  'stage' => 'Ensino Fundamental II', 'code' => 'EF08', 'order' => 8],
            ['name' => '9º Ano',  'stage' => 'Ensino Fundamental II', 'code' => 'EF09', 'order' => 9],
            // Ensino Médio
            ['name' => '1ª Série', 'stage' => 'Ensino Médio', 'code' => 'EM01', 'order' => 10],
            ['name' => '2ª Série', 'stage' => 'Ensino Médio', 'code' => 'EM02', 'order' => 11],
            ['name' => '3ª Série', 'stage' => 'Ensino Médio', 'code' => 'EM03', 'order' => 12],
        ];

        foreach ($gradeLevels as $data) {
            GradeLevel::query()->firstOrCreate(['code' => $data['code']], $data);
        }

        $this->command->info('  ✔ Grade levels criados (' . count($gradeLevels) . ')');
    }
}
