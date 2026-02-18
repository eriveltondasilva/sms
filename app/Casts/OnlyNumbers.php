<?php

declare(strict_types=1);

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsInboundAttributes;
use Illuminate\Database\Eloquent\Model;

final class OnlyNumbers implements CastsInboundAttributes
{
    /** @param  array<string, mixed>  $attributes */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return $value ? preg_replace('/\D/', '', (string) $value) : null;
    }
}
