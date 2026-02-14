<?php

declare(strict_types=1);

namespace App\Enums;

enum StudentStatus: string
{
    // Aluno ativo e matriculado
    case ACTIVE = 'active';

    // Transferido para outra escola
    case TRANSFERRED = 'transferred';

    // Abandonou/desistiu dos estudos
    case DROPPED_OUT = 'dropped_out';

    // Concluiu todos os anos da escola
    case GRADUATED = 'graduated';

    public const DEFAULT = self::ACTIVE->value;

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE      => 'Ativo',
            self::TRANSFERRED => 'Transferido',
            self::DROPPED_OUT => 'Evadido',
            self::GRADUATED   => 'Formado',
        };
    }
}
