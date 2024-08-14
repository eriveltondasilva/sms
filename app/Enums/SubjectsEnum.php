<?php

namespace App\Enums;

use App\Trait\EnumHelperTrait;

enum SubjectsEnum: string
{
    use EnumHelperTrait;

    case PORTUGUESE  = 'português';
    case MATHEMATICS = 'matemática';
    case HISTORY     = 'história';
    case SCIENCE     = 'ciências';
    case ENGLISH     = 'inglês';
    case GEOGRAPHY   = 'geografia';
    case ARTS        = 'artes';

    public function abbr(): string
    {
        return match($this) {
            self::PORTUGUESE  => 'LPO',
            self::MATHEMATICS => 'MAT',
            self::HISTORY     => 'HIST',
            self::SCIENCE     => 'CIEN',
            self::ENGLISH     => 'ING',
            self::GEOGRAPHY   => 'GEO',
            self::ARTS        => 'ART',
            default           => $this->value
        };
    }
}
