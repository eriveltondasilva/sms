<?php

namespace App\Enums;

enum GenderEnum: string
{
    case MALE   = 'M';
    case FEMALE = 'F';

    public const DEFAULT = self::MALE;

    /* Returns the label corresponding to the value of the object. */
    public function label(): string
    {
        return match ($this) {
            self::MALE   => 'masculino',
            self::FEMALE => 'feminino',
        };
    }
}
