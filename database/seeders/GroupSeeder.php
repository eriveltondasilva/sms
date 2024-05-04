<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AcademicYear;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    public function run(): void
    {
        $academicYear = AcademicYear::IsActive();

        $groups = [
            [
                'name'      => '6° Ano',
                'classroom' => 'Sala 1',
                'shift'     => 'Vespertino',
            ],
            [
                'name'      => '7° Ano',
                'classroom' => 'Sala 2',
                'shift'     => 'Vespertino',
            ],
            [
                'name'      => '8° Ano',
                'classroom' => 'Sala 3',
                'shift'     => 'Vespertino',
            ],
            [
                'name'      => '9° Ano',
                'classroom' => 'Sala 4',
                'shift'     => 'Vespertino',
            ],
        ];

        $academicYear->groups()->createMany($groups);
    }
}
