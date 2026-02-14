<?php

declare(strict_types=1);

namespace App\Enums;

enum RecoveryType: string
{
    case PERIOD = 'period';
    case FINAL = 'final';

    public function label(): string
    {
        return match ($this) {
            self::PERIOD => 'Período',
            self::FINAL  => 'Final',
        };
    }
}
