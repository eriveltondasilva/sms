<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AcademicYear;
use Illuminate\Database\Seeder;

class QuarterSeeder extends Seeder
{
    public function run(): void
    {
        $quarters = [
            ['name' => '1° Trimestre'],
            ['name' => '2° Trimestre'],
            ['name' => '3° Trimestre'],
            ['name' => '4° Trimestre'],
        ];

        AcademicYear::all()->each(function ($year) use ($quarters) {
            $year->quarters()->createMany($quarters);
        });
    }
}
