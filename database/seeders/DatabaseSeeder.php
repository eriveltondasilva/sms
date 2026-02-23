<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Context;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('');
        $this->command->info('🌱 Iniciando seeds do sistema de gestão escolar...');
        $this->command->info('');

        $this->command->info('📋 [1/12] Roles e Permissões');
        $this->call(RolesAndPermissionsSeeder::class);

        $this->command->info('📚 [2/12] Séries / Níveis de Ensino');
        $this->call(GradeLevelSeeder::class);

        $this->command->info('🏫 [3/12] Escola + Usuários base');
        $this->call(SchoolSeeder::class);

        $this->command->info('📅 [4/12] Ano Letivo + Configuração + Bimestres');
        $this->call(SchoolYearSeeder::class);

        $this->command->info('📖 [5/12] Disciplinas');
        $this->call(SubjectSeeder::class);

        $this->command->info('📝 [6/12] Tipos de Avaliação');
        $this->call(AssessmentTypeSeeder::class);

        $this->command->info('👨‍🏫 [7/12] Professores + Usuários vinculados');
        $this->call(TeacherSeeder::class);

        $this->command->info('👨‍🎓 [8/12] Alunos + Responsáveis');
        $this->call(StudentSeeder::class);

        $this->command->info('🚪 [9/12] Turmas');
        $this->call(ClassroomSeeder::class);

        $this->command->info('🔗 [10/12] Atribuições de Ensino');
        $this->call(TeachingAssignmentSeeder::class);

        $this->command->info('📋 [11/12] Matrículas');
        $this->call(EnrollmentSeeder::class);

        $this->command->info('📊 [12/12] Dados Acadêmicos de Amostra');
        $this->call(SampleAcademicDataSeeder::class);

        $this->command->info('');
        $this->command->info('✅ Todas as seeds foram executadas com sucesso!');
        $this->command->info('');

        /** @var Collection<int, User> $users */
        $users = Context::get('users');

        $this->command->table(
            ['Credencial', 'Email', 'Senha'],
            collect($users)->map(fn (User $user): array => [
                $user->getRoleNames()->first(),
                $user->email,
                'password',
            ])->all(),
        );
    }
}
