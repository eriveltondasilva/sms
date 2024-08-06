<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

use App\Enums\RoleEnum;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (RoleEnum::cases() as $role) {
            Role::create([
                'name'         => $role->value,
                'display_name' => $role->label()
            ]);
        }
    }
}
