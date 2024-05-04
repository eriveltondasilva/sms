<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'username' => 'erivelton',
                'email'    => 'eriveltondasilva13@gmail.com',
                'role'     => RoleEnum::ADMIN,
            ],
            [
                'username' => 'admin',
                'email'    => 'admin@example.com',
                'role'     => RoleEnum::ADMIN,
            ],
            [
                'username' => 'teacher',
                'email'    => 'teacher@example.com',
                'role'     => RoleEnum::TEACHER,
            ],
            [
                'username' => 'student',
                'email'    => 'student@example.com',
                'role'     => RoleEnum::STUDENT,
            ],
            [
                'username' => 'user',
                'email'    => 'user@example.com',
                'role'     => RoleEnum::USER,
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
            $user->assignRole(RoleEnum::DEFAULT);
        });
    }
}
