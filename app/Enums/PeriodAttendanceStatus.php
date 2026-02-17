<?php

declare(strict_types=1);

namespace App\Enums;

enum PeriodAttendanceStatus: string
{
    // attendance_percentage >= min_attendance_percentage
    case SUFFICIENT = 'sufficient';

    // attendance_percentage < min_attendance_percentage
    case INSUFFICIENT = 'insufficient';

    public function label(): string
    {
        return match ($this) {
            self::SUFFICIENT   => 'Frequência Suficiente',
            self::INSUFFICIENT => 'Frequência Insuficiente',
        };
    }

    public function isSufficient(): bool
    {
        return $this === self::SUFFICIENT;
    }
}
