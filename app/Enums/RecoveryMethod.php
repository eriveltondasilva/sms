<?php

declare(strict_types=1);

namespace App\Enums;

enum RecoveryMethod: string
{
    // Usa a maior nota entre original e recuperação
    // Ex: original 4.5, recuperação 7.5 → final 7.5
    case BEST_SCORE = 'best_score';

    // Média aritmética entre original e recuperação
    // Ex: original 4.5, recuperação 7.5 → final 6.0
    case AVERAGE = 'average';

    // Substitui completamente pela nota da recuperação
    // Ex: original 4.5, recuperação 7.5 → final 7.5 (independente)
    case REPLACE = 'replace';

    public const DEFAULT = self::BEST_SCORE->value;

    public function label(): string
    {
        return match ($this) {
            self::BEST_SCORE => 'Maior Nota',
            self::AVERAGE    => 'Média Aritmética',
            self::REPLACE    => 'Substituição Total',
        };
    }

    public function apply(float $original, float $recovery): float
    {
        return match ($this) {
            self::BEST_SCORE => max($original, $recovery),
            self::AVERAGE    => ($original + $recovery) / 2,
            self::REPLACE    => $recovery,
        };
    }
}
