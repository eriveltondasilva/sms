<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherFactory extends Factory
{
    public function definition(): array
    {
        $gender = fake()->randomElement(['M', 'F']);
        $name   = $gender === 'M' ? fake()->name('male') : fake()->name('female');

        return [
            'name'      => $name,
            'email'     => fake()->unique()->safeEmail(),
            'cpf'       => fake()->unique()->cpf(),
            'rg'        => fake()->unique()->rg(),
            'gender'    => $gender,
            'birthday'  => fake()->date(),
            'phone'     => fake()->cellphoneNumber(),
            //
            'address_street'   => fake()->streetAddress(),
            'address_city'     => fake()->city(),
            'address_state'    => fake()->state(),
            'address_zip_code' => fake()->postcode(),
        ];
    }
}
