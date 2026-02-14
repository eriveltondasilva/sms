<?php

declare(strict_types=1);

namespace App\Enums;

enum SchoolYearStatus: string
{
    // Ano em planejamento, turmas sendo montadas
    case PLANNING = 'planning';

    // Ano letivo em andamento, aulas ativas
    case IN_PROGRESS = 'in_progress';

    // Ano finalizado, tudo read-only
    case CLOSED = 'closed';

    public const DEFAULT = self::PLANNING->value;

    public function label(): string
    {
        return match ($this) {
            self::PLANNING    => 'Planejamento',
            self::IN_PROGRESS => 'Em andamento',
            self::CLOSED      => 'Finalizado',
        };
    }

    public function isEditable(): bool
    {
        return in_array($this, [self::PLANNING, self::IN_PROGRESS], true);
    }
}
