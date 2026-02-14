<?php

declare(strict_types=1);

namespace App\Enums;

enum LessonPlanStatus: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case APPROVED = 'approved';

    public const DEFAULT = self::DRAFT->value;

    public function label(): string
    {
        return match ($this) {
            self::DRAFT     => 'Rascunho',
            self::SUBMITTED => 'Submetido',
            self::APPROVED  => 'Aprovado',
        };
    }
}
