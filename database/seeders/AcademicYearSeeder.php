<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AcademicYear;
use Illuminate\Database\Seeder;

class AcademicYearSeeder extends Seeder
{
    public function run(): void
    {
        $academicYears = [
            [
                'year'       => '2020',
                'start_date' => '2020-01-01',
                'end_date'   => '2020-12-31',
                'is_active'  => false,
            ],
            [
                'year'       => '2021',
                'start_date' => '2021-01-01',
                'end_date'   => '2021-12-31',
                'is_active'  => false,
            ],
            [
                'year'       => '2022',
                'start_date' => '2022-01-01',
                'end_date'   => '2022-12-31',
                'is_active'  => false,
            ],
            [
                'year'       => '2023',
                'start_date' => '2023-01-01',
                'end_date'   => '2023-12-31',
                'is_active'  => false,
            ],
            [
                'year'       => '2024',
                'start_date' => '2024-01-01',
                'end_date'   => '2024-12-31',
                'is_active'  => true,
            ],
        ];

        AcademicYear::insert($academicYears);
    }
}
