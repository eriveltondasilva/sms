<?php

declare(strict_types=1);

namespace App\Enums;

enum EnrollmentStatus: string
{
    // Matrícula ativa e em curso
    case ACTIVE = 'active';

    // Aluno transferido para outra escola
    case TRANSFERRED = 'transferred';

    // Aluno abandonou/desistiu do curso
    case DROPPED = 'dropped';

    // Aluno reprovado
    case FAILED = 'failed';

    // Matrícula concluída ao final do ano letivo
    case FINISHED = 'finished';

    public const DEFAULT = self::ACTIVE->value;

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE      => 'Ativo',
            self::TRANSFERRED => 'Transferido',
            self::DROPPED     => 'Abandonou',
            self::FAILED      => 'Reprovado',
            self::FINISHED    => 'Finalizado',
        };
    }
}
