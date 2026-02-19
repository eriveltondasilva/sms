<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\School;
use App\Support\SchoolContext;
use App\Support\SchoolContextResolver;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final readonly class SetSchoolContext
{
    public function __construct(private SchoolContextResolver $resolver) {}

    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
            return $next($request);
        }

        SchoolContext::clear();

        $school = $this->resolver->resolve($request->user());

        if ($school instanceof School) {
            SchoolContext::set($school);
        }

        return $next($request);
    }
}
