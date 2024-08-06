<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

use App\Enums\PermissionEnum;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        foreach (PermissionEnum::cases() as $permission) {
            Permission::create([
                'name'         => $permission->value,
                'display_name' => $permission->label()
            ]);
        }
    }
}
