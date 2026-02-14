<?php

declare(strict_types=1);

namespace App\Enums;

enum AttendanceStatus: string
{
    // Aluno presente na aula
    case PRESENT = 'present';

    // Aluno ausente sem justificativa
    case ABSENT = 'absent';

    // Ausência com justificativa válida (atestado, etc)
    case JUSTIFIED = 'justified';

    // Aluno chegou atrasado
    case LATE = 'late';

    public const DEFAULT = self::PRESENT->value;

    public function label(): string
    {
        return match ($this) {
            self::PRESENT   => 'Presente',
            self::ABSENT    => 'Ausente',
            self::JUSTIFIED => 'Justificado',
            self::LATE      => 'Atrasado',
        };
    }
}
