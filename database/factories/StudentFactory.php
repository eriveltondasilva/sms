<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        $gender = fake()->randomElement(['M', 'F']);

        $firstName = $gender === 'M' ? fake()->firstNameMale() : fake()->firstNameFemale();
        $fullName  = $firstName . ' ' . fake()->lastName() . ' ' . fake()->lastName();

        $email = strtolower($firstName) . '@' . fake()->safeEmailDomain();

        return [
            'name'            => $fullName,
            'email'           => $email,
            'cpf'             => fake()->unique()->cpf(),
            'rg'              => fake()->unique()->rg(),
            'gender'          => $gender,
            'birthday'        => fake()->date(),
            'birthplace'      => fake()->city(),
            'phone'           => fake()->cellphoneNumber(),
            'gov_benefits'    => fake()->sentence(),
            'health_problems' => fake()->sentence(),
            'note'            => fake()->text(),
            'is_active'       => true,
            //
            'address_street'   => fake()->streetAddress(),
            'address_city'     => fake()->city(),
            'address_state'    => fake()->state(),
            'address_zip_code' => fake()->postcode(),
        ];
    }
}
