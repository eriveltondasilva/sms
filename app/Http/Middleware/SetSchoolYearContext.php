<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\SchoolYear;
use App\Support\SchoolYearContext;
use App\Support\SchoolYearContextResolver;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final readonly class SetSchoolYearContext
{
    public function __construct(private SchoolYearContextResolver $resolver) {}

    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
            return $next($request);
        }

        SchoolYearContext::clear();

        if (has_school_context()) {
            $schoolYear = $this->resolver->resolve(current_school_id());

            if ($schoolYear instanceof SchoolYear) {
                SchoolYearContext::set($schoolYear);
            }
        }

        return $next($request);
    }
}
