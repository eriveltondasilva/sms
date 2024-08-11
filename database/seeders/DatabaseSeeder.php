<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SchoolYearSeeder::class,
            QuarterSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            SubjectSeeder::class,
            GroupSeeder::class,
            UserSeeder::class,
            TeacherSeeder::class,
            StudentSeeder::class,
        ]);
    }
}
