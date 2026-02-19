<?php

declare(strict_types=1);

namespace App\Support;

use App\Models\School;

final class SchoolContext
{
    private static ?School $school = null;

    public static function set(?School $school): void
    {
        self::$school = $school;
    }

    public static function get(): ?School
    {
        return self::$school;
    }

    public static function id(): ?int
    {
        return self::$school?->id;
    }

    public static function has(): bool
    {
        return self::$school instanceof School;
    }

    public static function clear(): void
    {
        self::$school = null;
    }
}
