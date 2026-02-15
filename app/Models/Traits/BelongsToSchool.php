<?php

declare(strict_types=1);

namespace App\Models\Traits;

use App\Models\Scopes\SchoolScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait BelongsToSchool
{
    protected function scopeWithoutSchoolScope(Builder $query): Builder
    {
        return $query->withoutGlobalScope(SchoolScope::class);
    }

    protected static function bootBelongsToSchool(): void
    {
        static::addGlobalScope(new SchoolScope());

        static::creating(function (Model $model): void {
            if (! has_school_context() || $model->hasAttribute('school_id')) {
                return;
            }

            $model->setAttribute('school_id', current_school_id());
        });
    }
}
