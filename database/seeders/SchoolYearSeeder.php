<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\AcademicPeriodStatus;
use App\Enums\AnnualFormulaType;
use App\Enums\PeriodFormulaType;
use App\Enums\RecoveryMethod;
use App\Enums\SchoolYearStatus;
use App\Models\AcademicPeriod;
use App\Models\School;
use App\Models\SchoolYear;
use App\Models\SchoolYearConfig;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

final class SchoolYearSeeder extends Seeder
{
    public function run(): void
    {
        /** @var School $school */
        $school = Context::get('school');

        $currentYear = (int) now()->format('Y');

        $schoolYear = SchoolYear::query()->firstOrCreate(
            [
                'school_id' => $school->id,
                'year'      => $currentYear,
            ],
            [
                'school_id'          => $school->id,
                'year'               => $currentYear,
                'status'             => SchoolYearStatus::IN_PROGRESS,
                'total_school_days'  => 200,
                'total_school_hours' => 800,
            ]
        );

        Context::add('school_year', $schoolYear);

        $this->command->info("  ✔ Ano letivo {$currentYear} criado (status: in_progress)");

        // Configuração pedagógica do ano letivo
        SchoolYearConfig::query()->firstOrCreate(
            ['school_year_id' => $schoolYear->id],
            [
                'school_year_id'            => $schoolYear->id,
                'period_formula_type'       => PeriodFormulaType::WEIGHTED_AVG,
                'annual_formula_type'       => AnnualFormulaType::SUM,
                'period_recovery_method'    => RecoveryMethod::BEST_SCORE,
                'annual_recovery_method'    => RecoveryMethod::AVERAGE,
                'min_passing_score'         => 24.00, // soma dos 4 bimestres (escala 0-40)
                'min_period_score'          => 6.00,
                'min_attendance_percentage' => 75.00,
                'allows_final_exam'         => true,
            ]
        );

        $this->command->info('  ✔ Configuração pedagógica criada');

        // 4 bimestres letivos
        $periods = [
            [
                'order'      => 1,
                'name'       => '1º Bimestre',
                'start_date' => "{$currentYear}-02-03",
                'end_date'   => "{$currentYear}-04-25",
                'status'     => AcademicPeriodStatus::CLOSED,
            ],
            [
                'order'      => 2,
                'name'       => '2º Bimestre',
                'start_date' => "{$currentYear}-04-28",
                'end_date'   => "{$currentYear}-07-11",
                'status'     => AcademicPeriodStatus::CLOSED,
            ],
            [
                'order'      => 3,
                'name'       => '3º Bimestre',
                'start_date' => "{$currentYear}-07-28",
                'end_date'   => "{$currentYear}-10-10",
                'status'     => AcademicPeriodStatus::OPEN,
            ],
            [
                'order'      => 4,
                'name'       => '4º Bimestre',
                'start_date' => "{$currentYear}-10-13",
                'end_date'   => "{$currentYear}-12-19",
                'status'     => AcademicPeriodStatus::OPEN,
            ],
        ];

        foreach ($periods as $periodData) {
            AcademicPeriod::query()->firstOrCreate(
                [
                    'school_year_id' => $schoolYear->id,
                    'order'          => $periodData['order'],
                ],
                array_merge($periodData, ['school_year_id' => $schoolYear->id])
            );
        }

        $this->command->info('  ✔ 4 bimestres letivos criados');
    }
}
