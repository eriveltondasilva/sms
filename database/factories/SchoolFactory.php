<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<School>
 */
final class SchoolFactory extends Factory
{
    protected $model = School::class;

    /** @return array<string, mixed> */
    public function definition(): array
    {
        $name = fake()->company() . ' Escola';

        return [
            'full_name'     => $name,
            'short_name'    => mb_substr($name, 0, 30),
            'motto'         => fake()->sentence(5),
            'inep_code'     => fake()->unique()->numerify('########'),
            'cnpj'          => fake()->unique()->numerify('##############'),
            'phone'         => fake()->numerify('##9########'),
            'email'         => fake()->unique()->companyEmail(),
            'address'       => fake()->address(),
            'social_medias' => null,
            'is_active'     => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (): array => ['is_active' => false]);
    }
}
