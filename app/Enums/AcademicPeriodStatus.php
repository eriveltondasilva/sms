<?php

declare(strict_types=1);

namespace App\Enums;

enum AcademicPeriodStatus: string
{
    // Período em andamento, aceita lançamentos
    case OPEN = 'open';

    // Período em fechamento, últimos ajustes
    case CLOSING = 'closing';

    // Período fechado, read-only
    case CLOSED = 'closed';

    public const DEFAULT = self::OPEN->value;

    public function label(): string
    {
        return match ($this) {
            self::OPEN    => 'Aberto',
            self::CLOSING => 'Encerrando',
            self::CLOSED  => 'Fechado',
        };
    }
}
