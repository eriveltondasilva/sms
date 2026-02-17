<?php

declare(strict_types=1);

namespace App\Enums;

enum SubjectFinalResult: string
{
    // Aprovado: nota e frequência suficientes
    case APPROVED = 'approved';

    // Reprovado somente por nota (frequência OK, mas não atingiu mínimo anual)
    case FAILED_BY_GRADE = 'failed_by_grade';

    // Reprovado somente por frequência (nota OK, mas faltou muito)
    case FAILED_BY_ATTENDANCE = 'failed_by_attendance';

    // Reprovado pelos dois critérios
    case FAILED_BOTH = 'failed_both';

    public function label(): string
    {
        return match ($this) {
            self::APPROVED             => 'Aprovado',
            self::FAILED_BY_GRADE      => 'Reprovado por Nota',
            self::FAILED_BY_ATTENDANCE => 'Reprovado por Frequência',
            self::FAILED_BOTH          => 'Reprovado por Nota e Frequência',
        };
    }

    public function isApproved(): bool
    {
        return $this === self::APPROVED;
    }

    public function hasGradeFailure(): bool
    {
        return in_array($this, [self::FAILED_BY_GRADE, self::FAILED_BOTH], true);
    }

    public function hasAttendanceFailure(): bool
    {
        return in_array($this, [self::FAILED_BY_ATTENDANCE, self::FAILED_BOTH], true);
    }

    // Aluno pode fazer exame final apenas se reprovou POR NOTA (com frequência OK)
    public function isEligibleForFinalExam(): bool
    {
        return $this === self::FAILED_BY_GRADE;
    }
}
