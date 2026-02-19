<?php

declare(strict_types=1);

namespace App\Support;

use App\Enums\SchoolYearStatus;
use App\Enums\SessionKey;
use App\Models\SchoolYear;
use Illuminate\Support\Facades\Session;

final class SchoolYearContextResolver
{
    public function resolve(int $schoolId): ?SchoolYear
    {
        $query = SchoolYear::query()->where('school_id', $schoolId);

        return Session::has(SessionKey::SCHOOL_YEAR_ID)
            ? $query->find(Session::get(SessionKey::SCHOOL_YEAR_ID))
            : $query->whereFirst('status', SchoolYearStatus::IN_PROGRESS);
    }
}
