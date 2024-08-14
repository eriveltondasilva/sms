<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

use App\Enums\RolesEnum;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (RolesEnum::cases() as $role) {
            Role::create([
                'name'         => $role->value,
                'display_name' => $role->label()
            ]);
        }
    }
}
