<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
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

        SchoolYear::all()->each(fn ($year) => $year->quarters()->createMany($quarters));
    }
}
