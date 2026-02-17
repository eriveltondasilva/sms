<?php

declare(strict_types=1);

namespace App\Enums;

enum PeriodFormulaType: string
{
    // Média ponderada usando os pesos de cada avaliação
    case WEIGHTED_AVG = 'weighted_avg';

    // Média aritmética simples entre as avaliações
    case SIMPLE_AVG = 'simple_avg';

    public const DEFAULT = self::WEIGHTED_AVG->value;

    public function label(): string
    {
        return match ($this) {
            self::WEIGHTED_AVG => 'Média Ponderada',
            self::SIMPLE_AVG   => 'Média Aritmética',
        };
    }
}
