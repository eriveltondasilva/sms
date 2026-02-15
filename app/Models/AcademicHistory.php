<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\FinalResult;
use App\Models\Traits\BelongsToSchoolYear;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class AcademicHistory extends Model
{
    use BelongsToSchoolYear;
    use HasFactory;

    protected $table = 'academic_histories';

    protected $fillable = [
        'student_id',

        'final_score',
        'final_status',
        'observations',
    ];

    protected $casts = [
        'final_score'  => 'decimal:2',
        'final_status' => FinalResult::class,
    ];

    // * Relationships
    /** @return BelongsTo<Student, $this> */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /** @return BelongsTo<SchoolYear, $this> */
    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    /** @return HasMany<AcademicHistorySubject, $this> */
    public function subjects(): HasMany
    {
        return $this->hasMany(AcademicHistorySubject::class);
    }

    // * Scopes
    #[Scope]
    protected function forStudent(Builder $query, int $studentId): void
    {
        $query->where('student_id', $studentId);
    }

    #[Scope]
    protected function forYear(Builder $query, int $schoolYearId): void
    {
        $query->where('school_year_id', $schoolYearId);
    }

    #[Scope]
    protected function approved(Builder $query): void
    {
        $query->whereIn('final_status', FinalResult::approvedResults());
    }

    #[Scope]
    protected function failed(Builder $query): void
    {
        $query->whereIn('final_status', FinalResult::failedResults());
    }

    // * Business methods
    public function canBeModified(): bool
    {
        /** @var SchoolYear $schoolYear */
        $schoolYear = $this->schoolYear;

        return $schoolYear->status->isEditable();
    }
}
