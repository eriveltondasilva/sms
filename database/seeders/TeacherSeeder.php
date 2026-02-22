<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\Gender;
use App\Enums\UserRole;
use App\Models\School;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Hash;

final class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        $teachers = [
            [
                'name'          => 'Ana Paula Ferreira',
                'gender'        => Gender::FEMALE,
                'cpf'           => '11111111101',
                'qualification' => 'Licenciatura em Letras',
                'email'         => 'ana.ferreira@escola.dev',
                'hire_date'     => '2018-03-01',
            ],
            [
                'name'          => 'Carlos Eduardo Souza',
                'gender'        => Gender::MALE,
                'cpf'           => '22222222202',
                'qualification' => 'Licenciatura em Matemática',
                'email'         => 'carlos.souza@escola.dev',
                'hire_date'     => '2015-07-01',
            ],
            [
                'name'          => 'Mariana Costa Lima',
                'gender'        => Gender::FEMALE,
                'cpf'           => '33333333303',
                'qualification' => 'Licenciatura em Ciências Biológicas',
                'email'         => 'mariana.lima@escola.dev',
                'hire_date'     => '2020-02-01',
            ],
            [
                'name'          => 'Roberto Alves Neto',
                'gender'        => Gender::MALE,
                'cpf'           => '44444444404',
                'qualification' => 'Licenciatura em História',
                'email'         => 'roberto.neto@escola.dev',
                'hire_date'     => '2019-08-01',
            ],
            [
                'name'          => 'Fernanda Oliveira',
                'gender'        => Gender::FEMALE,
                'cpf'           => '55555555505',
                'qualification' => 'Licenciatura em Física',
                'email'         => 'fernanda.oliveira@escola.dev',
                'hire_date'     => '2021-03-01',
            ],
        ];

        foreach ($teachers as $data) {
            $teacher = Teacher::query()->firstOrCreate(
                ['school_id' => $school->id, 'cpf' => $data['cpf']],
                array_merge($data, [
                    'school_id'  => $school->id,
                    'birth_date' => '1985-06-15',
                    'phone'      => '11987654' . fake()->numerify('####'),
                    'address'    => 'São Paulo/SP',
                    'is_active'  => true,
                ])
            );

            // Cria usuário vinculado ao professor (se ainda não existir)
            if (! User::query()->where('email', $data['email'])->exists()) {
                $user = User::query()->create([
                    'school_id'    => $school->id,
                    'profile_type' => Teacher::class,
                    'profile_id'   => $teacher->id,
                    'name'         => $teacher->name,
                    'email'        => $data['email'],
                    'password'     => Hash::make('password'),
                    'is_active'    => true,
                ]);

                $user->assignRole(UserRole::TEACHER);
            }
        }

        $this->command->info('  ✔ ' . count($teachers) . ' professores criados com usuários');
    }
}
