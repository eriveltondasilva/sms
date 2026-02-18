<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AnnualFormulaType;
use App\Enums\PeriodFormulaType;
use App\Enums\RecoveryMethod;
use App\Models\Traits\BelongsToSchoolYear;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class SchoolYearConfig extends Model
{
    use BelongsToSchoolYear;
    use HasFactory;

    protected $table = 'school_year_configs';

    protected $fillable = [
        'period_formula_type',
        'annual_formula_type',

        'period_recovery_method',
        'annual_recovery_method',

        'min_passing_score',
        'min_period_score',
        'min_attendance_percentage',

        'allows_final_exam',
    ];

    protected $casts = [
        'period_formula_type' => PeriodFormulaType::class,
        'annual_formula_type' => AnnualFormulaType::class,

        'period_recovery_method' => RecoveryMethod::class,
        'annual_recovery_method' => RecoveryMethod::class,

        'min_passing_score'         => 'decimal:2',
        'min_period_score'          => 'decimal:2',
        'min_attendance_percentage' => 'decimal:2',

        'allows_final_exam' => 'boolean',
    ];

    // * Relationships

    /** @return BelongsTo<SchoolYear, $this> */
    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }
}
