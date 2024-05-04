<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;

class SearchService
{
    public function searchByTerm(Builder $query, string $searchTerm = '')
    {
        return $query
            ->when($searchTerm, function (Builder $query) use ($searchTerm) {
                $query
                    ->where('id', $searchTerm)
                    ->orWhere('name', 'like', "%{$searchTerm}%");
            })
            ->orderByDesc('id');
    }
}
