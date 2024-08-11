<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    public function run(): void
    {
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

        $schoolYear = SchoolYear::isActive();
        $schoolYear->groups()->createMany($groups);
    }
}
