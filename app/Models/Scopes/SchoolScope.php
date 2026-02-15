<?php

declare(strict_types=1);

namespace App\Models\Scopes;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

final class SchoolScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        /** @var User $user */
        $user = Auth::user();

        if (! has_school_context() || $user->isSuperAdmin()) {
            return;
        }

        /** @var \App\Models\Model $model */
        $builder->where($model->getTable() . '.school_id', current_school_id());
    }
}
