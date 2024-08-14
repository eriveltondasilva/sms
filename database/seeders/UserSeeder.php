<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Enums\RolesEnum;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'username' => 'erivelton',
                'email'    => 'eriveltondasilva13@gmail.com',
                'role'     => RolesEnum::ADMIN,
            ],
            [
                'username' => 'admin',
                'email'    => 'admin@example.com',
                'role'     => RolesEnum::ADMIN,
            ],
            [
                'username' => 'teacher',
                'email'    => 'teacher@example.com',
                'role'     => RolesEnum::TEACHER,
            ],
            [
                'username' => 'student',
                'email'    => 'student@example.com',
                'role'     => RolesEnum::STUDENT,
            ],
            [
                'username' => 'user',
                'email'    => 'user@example.com',
                'role'     => RolesEnum::USER,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::factory()->create([
                'username' => $userData['username'],
                'email'    => $userData['email']
            ]);
            $user->assignRole($userData['role']);
        }

        User::factory()->count(10)->create()->each(function ($user) {
            $user->assignRole(RolesEnum::DEFAULT);
        });
    }
}
