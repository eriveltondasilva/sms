<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{
    AcademicYear,
    Group,
    Subject,
    Teacher,
    User,
};

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::find(3);

        $teacher = Teacher::factory()->create();
        $teacher->user()->save($user);

        $teachers = Teacher::factory()->count(9)->create();

        // #SEEDER: Group/Teacher
        $group1 = Group::find(1);
        $group1->teachers()->attach($teacher);
        $group1->teachers()->attach($teachers);

        $group2 = Group::find(2);
        $group2->teachers()->attach($teacher);

        // #SEEDER: Subject/Teacher
        $activeYearId = AcademicYear::isActive()->id;

        $subjects = Subject::all();
        $subjects->each(fn ($subject) => $subject->teachers()->attach([3, rand(1, 10), rand(1, 10)], ['academic_year_id' => $activeYearId]));
    }
}
