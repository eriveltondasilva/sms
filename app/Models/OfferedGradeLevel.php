<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Scopes\HasActiveScope;
use App\Models\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class OfferedGradeLevel extends Model
{
    use BelongsToSchool;
    use HasActiveScope;
    use HasFactory;

    protected $table = 'offered_grade_levels';

    protected $fillable = [
        'grade_level_id',

        'display_name',

        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // * Relationships
    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return BelongsTo<GradeLevel, $this> */
    public function gradeLevel(): BelongsTo
    {
        return $this->belongsTo(GradeLevel::class);
    }

    /** @return HasMany<Classroom, $this> */
    public function classrooms(): HasMany
    {
        return $this->hasMany(Classroom::class);
    }
}
