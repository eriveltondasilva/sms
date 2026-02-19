<?php

declare(strict_types=1);

use App\Models\{School, SchoolYear};
use App\Support\{SchoolContext, SchoolYearContext};

// --- School ---

if (! function_exists('current_school')) {
    function current_school(): ?School
    {
        return SchoolContext::get();
    }
}

if (! function_exists('current_school_id')) {
    function current_school_id(): ?int
    {
        return SchoolContext::id();
    }
}

if (! function_exists('set_school_context')) {
    function set_school_context(?School $school = null): void
    {
        SchoolContext::set($school);
    }
}

if (! function_exists('has_school_context')) {
    function has_school_context(): bool
    {
        return SchoolContext::has();
    }
}

// --- School Year ---

if (! function_exists('current_school_year')) {
    function current_school_year(): ?SchoolYear
    {
        return SchoolYearContext::get();
    }
}

if (! function_exists('current_school_year_id')) {
    function current_school_year_id(): ?int
    {
        return SchoolYearContext::id();
    }
}

if (! function_exists('set_school_year_context')) {
    function set_school_year_context(?SchoolYear $schoolYear = null): void
    {
        SchoolYearContext::set($schoolYear);
    }
}

if (! function_exists('has_school_year_context')) {
    function has_school_year_context(): bool
    {
        return SchoolYearContext::has();
    }
}
