<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\Gender;
use App\Enums\StudentStatus;
use App\Models\School;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
final class StudentFactory extends Factory
{
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(Gender::cases());
        $name = $gender === Gender::FEMALE
            ? fake('pt_BR')->firstNameFemale() . ' ' . fake('pt_BR')->lastName()
            : fake('pt_BR')->firstNameMale() . ' ' . fake('pt_BR')->lastName();

        return [
            'school_id'         => School::factory(),
            'full_name'         => $name,
            'social_name'       => null,
            'registration'      => fake()->unique()->numerify('######'),
            'gender'            => $gender,
            'birth_date'        => fake()->dateTimeBetween('-18 years', '-5 years')->format('Y-m-d'),
            'birth_place'       => fake('pt_BR')->city() . ' - ' . fake('pt_BR')->stateAbbr(),
            'rg'                => null,
            'cpf'               => fake()->unique()->numerify('###########'),
            'phone'             => null,
            'email'             => null,
            'address'           => fake()->address(),
            'sus_card'          => null,
            'blood_type'        => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null]),
            'health_conditions' => null,
            'allergies'         => null,
            'status'            => StudentStatus::ACTIVE,
            'status_notes'      => null,
        ];
    }

    public function forSchool(int $schoolId): static
    {
        return $this->state(fn (): array => ['school_id' => $schoolId]);
    }
}
