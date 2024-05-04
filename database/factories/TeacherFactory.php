<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\GenderEnum;

class TeacherFactory extends Factory
{
    public function definition(): array
    {
        $gender = fake()->randomElement(['M', 'F']);

        $title     = $gender === 'M' ? fake()->titleMale() : fake()->titleFemale();
        $firstName = $gender === GenderEnum::MALE ? fake()->firstNameMale() : fake()->firstNameFemale();
        $fullName  = $title . ' ' . $firstName . ' ' . fake()->lastName() . ' ' . fake()->lastName();

        $email = strtolower($firstName) . '@' . fake()->safeEmailDomain();

        return [
            'name'      => $fullName,
            'email'     => $email,
            'cpf'       => fake()->unique()->cpf(),
            'rg'        => fake()->unique()->rg(),
            'gender'    => $gender,
            'birthday'  => fake()->date(),
            'phone'     => fake()->cellphoneNumber(),
            'is_active' => true,
            //
            'address_street'   => fake()->streetAddress(),
            'address_city'     => fake()->city(),
            'address_state'    => fake()->state(),
            'address_zip_code' => fake()->postcode(),
        ];
    }
}
