<?php

namespace App\Trait;

trait EnumHelperTrait
{
    public static function names(): array
    {
        return array_map(fn ($enum) => $enum->name, self::cases());
    }

    public static function values(): array
    {
        return array_map(fn ($enum) => $enum->value, self::cases());
    }

    public static function default(): static
    {
        return self::DEFAULT;
    }
}
