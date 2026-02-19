<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->command->info('🌱 Iniciando seeds...');

        $this->call([
            // GradeLevelsSeeder::class,
            RolesAndPermissionsSeeder::class,
            // SchoolSeeder::class,
            // SchoolYearSeeder::class,
            // SchoolEventSeeder::class,
            // AssessmentTypeSeeder::class,
            // TeacherSeeder::class,
            // StudentSeeder::class,
            UserSeeder::class,
        ]);

        $this->command->info('✅ Seeds concluídas com sucesso!');
    }
}
