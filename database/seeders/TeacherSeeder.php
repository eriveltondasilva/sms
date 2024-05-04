<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\{Group, Teacher, User};

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::find(3);

        $teacher = Teacher::factory()->create();
        $teacher->user()->save($user);

        $teachers = Teacher::factory()->count(10)->create();
        Teacher::factory()->count(5)->create(['is_active' => false]);

        $group1 = Group::find(1);
        $group2 = Group::find(2);

        $group1->teachers()->attach($teacher);
        $group2->teachers()->attach($teacher);
        $group1->teachers()->attach($teachers);

    }
}
