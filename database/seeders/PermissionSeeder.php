<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

use App\Enums\PermissionsEnum;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        foreach (PermissionsEnum::cases() as $permission) {
            Permission::create([
                'name'         => $permission->value,
                'display_name' => $permission->label()
            ]);
        }
    }
}
