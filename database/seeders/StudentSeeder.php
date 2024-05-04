<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Group;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $firstGroupStudents  = Student::factory()->count(15)->create();
        $secondGroupStudents = Student::factory()->count(15)->create();

        Group::find(1)->students()->attach($firstGroupStudents);
        Group::find(2)->students()->attach($secondGroupStudents);

        Student::factory()->count(20)->create();
    }
}
