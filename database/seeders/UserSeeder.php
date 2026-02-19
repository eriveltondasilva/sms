<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\Context;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Super Admin', 'email' => 'superadmin@example.com', 'role' => UserRole::SUPER_ADMIN],
            ['name' => 'Admin', 'email' => 'admin@example.com', 'role' => UserRole::ADMIN],
            ['name' => 'Coordenador', 'email' => 'coordenador@example.com', 'role' => UserRole::COORDINATOR],
            ['name' => 'Professor', 'email' => 'teacher@example.com', 'role' => UserRole::TEACHER],
        ];

        foreach ($users as $userData) {
            $user = User::query()->create([
                'school_id' => $userData['role'] === UserRole::SUPER_ADMIN ? null : Context::get('school_id'),
                'name'      => $userData['name'],
                'email'     => $userData['email'],
                'password'  => 'password',
            ]);

            $user->assignRole($userData['role']);
        }
    }
}
