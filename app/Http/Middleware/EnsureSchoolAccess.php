<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class EnsureSchoolAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless(
            has_school_context(),
            403,
            'Você não está associado a nenhuma escola. Selecione uma escola para acessar esse recurso.'
        );

        return $next($request);
    }
}
