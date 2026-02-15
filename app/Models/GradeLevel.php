<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class GradeLevel extends Model
{
    use HasFactory;

    protected $table = 'grade_levels';

    protected $fillable = [
        'name',
        'stage',
        'code',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    // * Relationships
    /** @return HasMany<OfferedGradeLevel, $this> */
    public function offeredGradeLevels(): HasMany
    {
        return $this->hasMany(OfferedGradeLevel::class);
    }

    // * Scopes
    #[Scope]
    protected function ordered(Builder $query): void
    {
        $query->orderBy('order');
    }
}
