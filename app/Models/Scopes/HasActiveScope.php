<?php

declare(strict_types=1);

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait HasActiveScope
{
    protected function scopeActive(Builder $query): Builder
    {
        return $query->where($this->getActiveColumn(), true);
    }

    protected function scopeInactive(Builder $query): Builder
    {
        return $query->where($this->getActiveColumn(), false);
    }

    public function activate(): void
    {
        $this->update([$this->getActiveColumn() => true]);
    }

    public function deactivate(): void
    {
        $this->update([$this->getActiveColumn() => false]);
    }

    protected function getActiveColumn(): string
    {
        return 'is_active';
    }
}
