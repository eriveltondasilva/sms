<?php

declare(strict_types=1);

namespace App\Enums;

enum SessionKey: string
{
    case IMPERSONATED_SCHOOL_ID = 'school_context:impersonated_school_id';
    case SCHOOL_YEAR_ID = 'school_context:school_year_id';
}
