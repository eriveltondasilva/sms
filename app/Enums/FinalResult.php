<?php

declare(strict_types=1);

namespace App\Enums;

enum FinalResult: string
{
    // Reprovado por nota insuficiente
    case FAILED = 'failed';

    // Reprovado por frequência abaixo do mínimo
    case FAILED_ATTENDANCE = 'failed_attendance';

    // Aprovado direto
    case APPROVED = 'approved';

    // Aprovado após recuperação (período ou final)
    case APPROVED_AFTER_RECOVERY = 'approved_after_recovery';

    public function label(): string
    {
        return match ($this) {
            self::FAILED                  => 'Reprovado',
            self::FAILED_ATTENDANCE       => 'Reprovado por frequência',
            self::APPROVED                => 'Aprovado',
            self::APPROVED_AFTER_RECOVERY => 'Aprovado após recuperação',
        };
    }

    public static function approvedResults(): array
    {
        return [
            self::APPROVED,
            self::APPROVED_AFTER_RECOVERY,
        ];
    }

    public static function failedResults(): array
    {
        return [
            self::FAILED,
            self::FAILED_ATTENDANCE,
        ];
    }

    public function isApproved(): bool
    {
        return in_array($this, self::approvedResults(), true);
    }

    public function isFailed(): bool
    {
        return in_array($this, self::failedResults(), true);
    }
}
