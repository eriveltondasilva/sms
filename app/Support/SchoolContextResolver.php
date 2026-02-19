<?php

declare(strict_types=1);

namespace App\Support;

use App\Enums\SessionKey;
use App\Models\School;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

final class SchoolContextResolver
{
    public function resolve(?User $user): ?School
    {
        if (Session::has(SessionKey::IMPERSONATED_SCHOOL_ID)) {
            $schoolId = Session::get(SessionKey::IMPERSONATED_SCHOOL_ID);

            $school = School::query()->active()->find($schoolId);

            if (! $school) {
                Log::warning('Impersonated school not found or inactive, clearing session', [
                    'school_id' => $schoolId,
                ]);

                Session::forget(SessionKey::IMPERSONATED_SCHOOL_ID);
            }

            return $school;
        }

        if ($user instanceof User) {
            return $user->school;
        }

        return null;
    }
}
