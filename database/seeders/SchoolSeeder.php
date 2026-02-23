<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\GradeLevel;
use App\Models\OfferedGradeLevel;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Hash;

final class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        // Cria a escola principal
        $school = School::query()->firstOrCreate(
            ['cnpj' => '12345678000195'],
            [
                'full_name'     => 'Escola Estadual Professor João da Silva',
                'short_name'    => 'EE Prof. João Silva',
                'motto'         => 'Educação que transforma vidas',
                'inep_code'     => '12345678',
                'cnpj'          => '12345678000195',
                'phone'         => '11987654321',
                'email'         => 'contato@eeprofjoaosilva.edu.br',
                'address'       => 'Rua das Flores, 123 - Centro - São Paulo/SP - 01001-000',
                'social_medias' => null,
                'is_active'     => true,
            ]
        );

        Context::add('school', $school);

        $this->command->info("  ✔ Escola criada: {$school->short_name}");

        // Cria super admin (sem escola)
        $superAdmin = $this->createUser(
            schoolId: null,
            name: 'Super Admin',
            email: 'superadmin@example.com',
            role: UserRole::SUPER_ADMIN,
        );

        // Cria admin vinculado à escola
        $admin = $this->createUser(
            schoolId: $school->id,
            name: 'Administrador',
            email: 'admin@example.com',
            role: UserRole::ADMIN,
        );

        // Cria coordenador pedagógico
        $coordinator = $this->createUser(
            schoolId: $school->id,
            name: 'Coordenador Pedagógico',
            email: 'coordenador@example.com',
            role: UserRole::COORDINATOR,
        );

        Context::push('users', $superAdmin, $admin, $coordinator);

        $this->command->info('  ✔ Usuários base criados (super_admin, admin, coordenador)');

        // Vincula séries ao school
        $this->createOfferedGradeLevels($school->id);

        $this->command->info('  ✔ Séries oferecidas vinculadas à escola');
    }

    private function createUser(
        ?int $schoolId,
        string $name,
        string $email,
        UserRole $role,
    ): User {
        $user = User::query()->firstOrCreate(
            ['email' => $email],
            [
                'school_id' => $schoolId,
                'name'      => $name,
                'email'     => $email,
                'password'  => Hash::make('password'),
                'is_active' => true,
            ]
        );

        $user->assignRole($role);

        return $user;
    }

    private function createOfferedGradeLevels(int $schoolId): void
    {
        // Oferece as séries do Ensino Fundamental II
        $codes = ['EF06', 'EF07', 'EF08', 'EF09'];

        $gradeLevels = GradeLevel::query()
            ->whereIn('code', $codes)
            ->get();

        foreach ($gradeLevels as $gradeLevel) {
            OfferedGradeLevel::query()->firstOrCreate(
                [
                    'school_id'      => $schoolId,
                    'grade_level_id' => $gradeLevel->id,
                ],
                [
                    'school_id'      => $schoolId,
                    'grade_level_id' => $gradeLevel->id,
                    'display_name'   => $gradeLevel->name . ' - ' . $gradeLevel->stage,
                    'is_active'      => true,
                ]
            );
        }
    }
}
