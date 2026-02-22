<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Assessment;
use App\Models\Enrollment;
use App\Models\StudentScore;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StudentScore>
 */
final class StudentScoreFactory extends Factory
{
    protected $model = StudentScore::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assessment_id' => Assessment::factory(),
            'enrollment_id' => Enrollment::factory(),
            'created_by'    => null,
            'score'         => fake()->randomFloat(2, 3.0, 10.0),
        ];
    }
}
