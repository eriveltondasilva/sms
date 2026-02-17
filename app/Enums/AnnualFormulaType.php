<?php

declare(strict_types=1);

namespace App\Enums;

enum AnnualFormulaType: string
{
    // Soma dos períodos: 8.5 + 8.2 + 7.0 + 6.5 = 30.2 (de 40)
    // Padrão brasileiro: min_passing_score = 24.0
    case SUM = 'sum';

    // Média aritmética: (8.5 + 8.2 + 7.0 + 6.5) / 4 = 7.55 (de 10)
    // Neste caso: min_passing_score = 6.0
    case SIMPLE_AVG = 'simple_avg';

    // Média ponderada: cada período tem peso configurado
    case WEIGHTED_AVG = 'weighted_avg';

    public const DEFAULT = self::SUM->value;

    public function label(): string
    {
        return match ($this) {
            self::SUM          => 'Soma dos Períodos',
            self::SIMPLE_AVG   => 'Média Aritmética',
            self::WEIGHTED_AVG => 'Média Ponderada',
        };
    }
}
