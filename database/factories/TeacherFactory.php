<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\Gender;
use App\Models\School;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Teacher>
 */
final class TeacherFactory extends Factory
{
    protected $model = Teacher::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(Gender::cases());
        $name = $gender === Gender::FEMALE
            ? fake()->firstNameFemale() . ' ' . fake()->lastName()
            : fake()->firstNameMale() . ' ' . fake()->lastName();

        return [
            'school_id'     => School::factory(),
            'name'          => $name,
            'gender'        => $gender,
            'birth_date'    => fake()->dateTimeBetween('-55 years', '-25 years')->format('Y-m-d'),
            'phone'         => fake()->numerify('##9########'),
            'email'         => fake()->unique()->safeEmail(),
            'address'       => fake()->address(),
            'cpf'           => fake()->unique()->numerify('###########'),
            'rg'            => fake()->numerify('##########'),
            'qualification' => fake()->randomElement([
                'Licenciatura em Matemática',
                'Licenciatura em Letras',
                'Licenciatura em História',
                'Licenciatura em Ciências Biológicas',
                'Licenciatura em Geografia',
                'Licenciatura em Pedagogia',
                'Licenciatura em Educação Física',
                'Licenciatura em Artes',
            ]),
            'hire_date' => fake()->dateTimeBetween('-10 years', '-1 year')->format('Y-m-d'),
            'bank_data' => null,
            'is_active' => true,
        ];
    }

    public function forSchool(int $schoolId): static
    {
        return $this->state(fn (): array => ['school_id' => $schoolId]);
    }

    public function inactive(): static
    {
        return $this->state(fn (): array => ['is_active' => false]);
    }
}
