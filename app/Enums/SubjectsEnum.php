<?php

namespace App\Enums;

use App\Traits\EnumHelperTrait;

enum SubjectsEnum: string
{
    use EnumHelperTrait;

    case ART = 'arte';
    case CIE = 'ciências';
    case EFI = 'educação física';
    case GEO = 'geografia';
    case HIS = 'história';
    case LIN = 'língua inglesa';
    case LPO = 'língua portuguesa';
    case MAT = 'matemática';

    public function abbr(): string
    {
        return $this->name;
    }
}
