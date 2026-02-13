<?php

declare(strict_types=1);

namespace App\AuditResolvers;

use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Contracts\Resolver;

final class SchoolIdResolver implements Resolver
{
    public static function resolve(Auditable $auditable)
    {
        return method_exists($auditable, 'school')
            ? $auditable->school_id
            : null;
    }
}
