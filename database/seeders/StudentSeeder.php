<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Guardian;
use App\Models\School;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

final class StudentSeeder extends Seeder
{
    private int $registrationCounter = 1;

    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        // Cria 25 alunos usando factory
        $students = Student::factory()
            ->count(25)
            ->forSchool($school->id)
            ->create([
                'registration' => fn (): string => mb_str_pad((string) $this->registrationCounter++, 6, '0', STR_PAD_LEFT),
            ]);

        $this->command->info("  ✔ {$students->count()} alunos criados");

        // Cria responsáveis e vincula aos alunos
        $guardianCount = 0;

        foreach ($students as $student) {
            $guardian = Guardian::factory()->forSchool($school->id)->create();

            $student->guardians()->attach($guardian->id, [
                'relationship' => fake()->randomElement(['Mãe', 'Pai', 'Avó', 'Avô', 'Tio(a)']),
                'is_primary'   => true,
            ]);

            // 30% dos alunos têm um segundo responsável
            if (fake()->boolean(30)) {
                $secondGuardian = Guardian::factory()->forSchool($school->id)->create();
                $student->guardians()->attach($secondGuardian->id, [
                    'relationship' => 'Pai',
                    'is_primary'   => false,
                ]);
                $guardianCount++;
            }

            $guardianCount++;
        }

        $this->command->info("  ✔ {$guardianCount} responsáveis criados e vinculados");
    }
}
