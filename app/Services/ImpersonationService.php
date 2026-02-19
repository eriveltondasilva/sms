<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\SessionKey;
use App\Models\School;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

final readonly class ImpersonationService
{
    public function start(School $school): void
    {
        Session::put(SessionKey::IMPERSONATED_SCHOOL_ID, $school->id);

        Log::info('School impersonation started', [
            'school_id' => $school->id,
            'user_id'   => Auth::id(),
        ]);
    }

    public function stop(): void
    {
        if (! $this->isActive()) {
            return;
        }

        $schoolId = Session::get(SessionKey::IMPERSONATED_SCHOOL_ID);

        Session::forget(SessionKey::IMPERSONATED_SCHOOL_ID);

        Log::info('School impersonation stopped', [
            'school_id' => $schoolId,
            'user_id'   => Auth::id(),
        ]);
    }

    public function resolveSchool(): ?School
    {
        if (! $this->isActive()) {
            return null;
        }

        $schoolId = Session::get(SessionKey::IMPERSONATED_SCHOOL_ID);

        /** @var School|null $school */
        $school = School::query()->active()->find($schoolId);

        if (! $school) {
            Log::warning('Impersonated school not found or inactive, clearing session', [
                'school_id' => $schoolId,
            ]);

            $this->stop();
        }

        return $school;
    }

    public function isActive(): bool
    {
        return Session::has(SessionKey::IMPERSONATED_SCHOOL_ID);
    }
}
