<?php

declare(strict_types=1);

namespace App\Enums;

enum Gender: string
{
    case MALE = 'M';
    case FEMALE = 'F';
    case OTHER = 'O';

    public const DEFAULT = self::MALE->value;

    public function label(): string
    {
        return match ($this) {
            self::MALE   => 'Masculino',
            self::FEMALE => 'Feminino',
            self::OTHER  => 'Outro',
        };
    }
}
