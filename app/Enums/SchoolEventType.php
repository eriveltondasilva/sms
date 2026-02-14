<?php

declare(strict_types=1);

namespace App\Enums;

enum SchoolEventType: string
{
    case INSTITUTIONAL = 'institutional';
    case PEDAGOGICAL = 'pedagogical';
    case HOLIDAY = 'holiday';
    case RECESS = 'recess';

    public const DEFAULT = self::INSTITUTIONAL->value;

    public function label(): string
    {
        return match ($this) {
            self::INSTITUTIONAL => 'Institucional',
            self::PEDAGOGICAL   => 'Pedagógico',
            self::HOLIDAY       => 'Feriado',
            self::RECESS        => 'Recesso',
        };
    }
}
