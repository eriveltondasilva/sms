<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\{UserPermission, UserRole};
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\{Permission, Role};
use Spatie\Permission\PermissionRegistrar;

final class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (UserRole::cases() as $role) {
            Role::create([
                'name' => $role->value,
                'label' => $role->label(),
                'color' => $role->color()
            ]);
        }

        foreach (UserPermission::cases() as $permission) {
            Permission::create(['name' => $permission->value]);
        }

        $role = Role::query()->whereFirst('name', UserRole::ADMIN);
        // $role->givePermissionTo([
        //     UserPermission::STUDENTS_VIEW,
        //     UserPermission::SUBJECTS_VIEW,
        //     UserPermission::ATTENDANCES_VIEW
        // ]);
    }
}
