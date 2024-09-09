<?php

namespace App\Traits;

trait EnumHelperTrait
{
    abstract public static function cases(): array;

    public static function names(): array
    {
        return array_map(fn ($enum) => $enum->name, self::cases());
    }

    public static function values(): array
    {
        return array_map(fn ($enum) => $enum->value, self::cases());
    }

    public static function array(): array
    {
        return array_combine(self::names(), self::values());
    }
}
