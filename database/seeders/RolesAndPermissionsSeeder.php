<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\UserPermission;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

final class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (UserRole::cases() as $role) {
            Role::query()->create([
                'name'  => $role->value,
                'label' => $role->label(),
                'color' => $role->color(),
            ]);
        }

        $this->command->info('  ✔ Roles criadas');

        foreach (UserPermission::cases() as $permission) {
            Permission::query()->create(['name' => $permission->value]);
        }

        $this->command->info('  ✔ Permissões criadas');
    }
}
