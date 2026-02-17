<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Scopes\HasActiveScope;
use App\Models\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Subject extends Model
{
    use BelongsToSchool;
    use HasActiveScope;
    use HasFactory;

    protected $table = 'subjects';

    protected $fillable = [
        'name',
        'code',
        'week_hours',

        'is_active',
    ];

    protected $casts = [
        'week_hours' => 'integer',
        'is_active'  => 'boolean',
    ];

    // * Relationships
    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return HasMany<TeachingAssignment, $this> */
    public function teachingAssignments(): HasMany
    {
        return $this->hasMany(TeachingAssignment::class);
    }

    /** @return HasMany<ClassSchedule, $this> */
    public function classSchedules(): HasMany
    {
        return $this->hasMany(ClassSchedule::class);
    }

    /** @return HasMany<LessonPlan, $this> */
    public function lessonPlans(): HasMany
    {
        return $this->hasMany(LessonPlan::class);
    }

    /** @return HasMany<SchoolEvent, $this> */
    public function schoolEvents(): HasMany
    {
        return $this->hasMany(SchoolEvent::class);
    }
}
