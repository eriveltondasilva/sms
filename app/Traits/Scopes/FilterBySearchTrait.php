<?php

namespace App\Traits\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait FilterBySearchTrait
{
    public function scopeFilterBySearch(Builder $query, ?string $search)
    {
        $query->when($search, function ($query) use ($search) {
            $query->where('id', $search)
                ->orWhereLike('name', $search . '%');
        });
    }
}
