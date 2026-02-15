<?php

declare(strict_types=1);

namespace App\Models\Traits;

use App\Models\Scopes\SchoolYearScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait BelongsToSchoolYear
{
    protected function scopeWithoutSchoolYearScope(Builder $query): Builder
    {
        return $query->withoutGlobalScope(SchoolYearScope::class);
    }

    protected static function bootBelongsToSchoolYear(): void
    {
        static::addGlobalScope(new SchoolYearScope());

        static::creating(function (Model $model): void {
            if (! has_school_year_context() || $model->hasAttribute('school_year_id')) {
                return;
            }

            $model->setAttribute('school_year_id', current_school_year_id());
        });
    }
}
