<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Scopes\HasActiveScope;
use App\Models\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class AssessmentType extends Model
{
    use BelongsToSchool;
    use HasActiveScope;
    use HasFactory;

    protected $table = 'assessment_types';

    protected $fillable = [
        'name',
        'description',

        'max_score',
        'weight',

        'is_active',
    ];

    protected $casts = [
        'max_score' => 'decimal:2',
        'weight'    => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // * Relationships

    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return HasMany<Assessment, $this> */
    public function assessments(): HasMany
    {
        return $this->hasMany(Assessment::class);
    }
}
