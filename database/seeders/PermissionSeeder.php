<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
// use Spatie\Permission\Models\Role;
use App\Enums\PermissionEnum;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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
