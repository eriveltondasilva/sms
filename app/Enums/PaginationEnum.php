<?php

namespace App\Enums;

use App\Traits\EnumHelperTrait;

enum PaginationEnum: int
{
    use EnumHelperTrait;

    case SMALL = 10;
    case MEDIUM = 15;
    case LARGE = 20;

    public const DEFAULT = self::SMALL;
}
