<?php

declare(strict_types=1);

namespace App\Enums;

enum PeriodGradeStatus: string
{
    // Nota final >= min_period_score do school_year_config
    case PASSING = 'passing';

    // Nota calculada < min_period_score, aguardando recuperação
    case NEEDS_RECOVERY = 'needs_recovery';

    // Não fez recuperação no prazo ou não atingiu o mínimo após recuperação
    case FAILED = 'failed';

    public function label(): string
    {
        return match ($this) {
            self::PASSING        => 'Aprovado no Período',
            self::NEEDS_RECOVERY => 'Em Recuperação',
            self::FAILED         => 'Reprovado no Período',
        };
    }

    public function isPassing(): bool
    {
        return $this === self::PASSING;
    }

    public function needsRecovery(): bool
    {
        return $this === self::NEEDS_RECOVERY;
    }
}
