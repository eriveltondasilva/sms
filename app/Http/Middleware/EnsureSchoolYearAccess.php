<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class EnsureSchoolYearAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless(
            has_school_year_context(),
            403,
            'Nenhum ano letivo ativo encontrado para esta escola.'
        );

        return $next($request);
    }
}
