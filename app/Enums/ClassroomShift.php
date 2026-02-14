<?php

declare(strict_types=1);

namespace App\Enums;

enum ClassroomShift: string
{
    // Turno da manhã (tipicamente 7h-12h)
    case MORNING = 'morning';

    // Turno da tarde (tipicamente 13h-18h)
    case AFTERNOON = 'afternoon';

    // Turno da noite (tipicamente 18h-22h)
    case EVENING = 'evening';

    public const DEFAULT = self::AFTERNOON->value;

    public function label(): string
    {
        return match ($this) {
            self::MORNING   => 'Matutino',
            self::AFTERNOON => 'Vespertino',
            self::EVENING   => 'Noturno',
        };
    }
}
