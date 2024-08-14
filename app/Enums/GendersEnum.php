<?php

namespace App\Enums;

use App\Trait\EnumHelperTrait;

enum GendersEnum: string
{
    use EnumHelperTrait;

    case FEMALE = 'F';
    case MALE   = 'M';

    public const DEFAULT = self::MALE;

    public function label(): string
    {
        return match ($this) {
            self::MALE   => 'masculino',
            self::FEMALE => 'feminino',
        };
    }
}
