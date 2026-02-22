<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\AssessmentCategory;
use App\Models\AcademicPeriod;
use App\Models\Assessment;
use App\Models\TeachingAssignment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Assessment>
 */
final class AssessmentFactory extends Factory
{
    protected $model = Assessment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'teaching_assignment_id' => TeachingAssignment::factory(),
            'academic_period_id'     => AcademicPeriod::factory(),
            'assessment_type_id'     => null,
            'created_by'             => null,
            'name'                   => fake()->randomElement(['Prova Bimestral', 'Trabalho em Grupo', 'Exercício', 'Prova Oral', 'Atividade Prática']),
            'description'            => null,
            'category'               => AssessmentCategory::REGULAR,
            'max_score'              => 10.00,
            'weight'                 => 1.00,
            'date'                   => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
        ];
    }
}
