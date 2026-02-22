<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Guardian;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Guardina>
 */
final class GuardianFactory extends Factory
{
    protected $model = Guardian::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'school_id' => School::factory(),
            'name'      => fake('pt_BR')->name(),
            'phone'     => fake()->numerify('##9########'),
            'email'     => fake()->optional(0.6)->safeEmail(),
            'cpf'       => fake()->unique()->numerify('###########'),
            'address'   => fake()->address(),
        ];
    }

    public function forSchool(int $schoolId): static
    {
        return $this->state(fn (): array => ['school_id' => $schoolId]);
    }
}
