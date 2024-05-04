<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AcademicYearSeeder::class,
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
