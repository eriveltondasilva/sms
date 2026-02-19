<?php

declare(strict_types=1);

namespace App\Support;

use App\Models\SchoolYear;

final class SchoolYearContext
{
    private static ?SchoolYear $schoolYear = null;

    public static function set(?SchoolYear $schoolYear): void
    {
        self::$schoolYear = $schoolYear;
    }

    public static function get(): ?SchoolYear
    {
        return self::$schoolYear;
    }

    public static function id(): ?int
    {
        return self::$schoolYear?->id;
    }

    public static function has(): bool
    {
        return self::$schoolYear instanceof SchoolYear;
    }

    public static function clear(): void
    {
        self::$schoolYear = null;
    }
}
