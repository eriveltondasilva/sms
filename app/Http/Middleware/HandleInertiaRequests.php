<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use App\Models\SchoolYear;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth'     => fn () => $this->getAuthUserData($request),
            'flash'    => fn () => $this->getFlashData($request),
            'oldInput' => fn () => $this->getOldInput($request),
        ]);
    }

    private function getAuthUserData(Request $request): ?array
    {
        if (! $request->user()) {
            return null;
        }

        $currentUser = $request->user();
        $cacheTime = now()->addMinutes(10);

        $user = Cache::remember("user_data_{$currentUser->id}", $cacheTime, function () use ($currentUser) {
            return $currentUser->only(['id', 'username', 'email', 'avatar_url', 'role']);
        });

        $activeYear = Cache::remember('active_school_year', $cacheTime, function () {
            return SchoolYear::select(['id', 'year'])->isActive();
        });

        return compact('user', 'activeYear');
    }

    private function getFlashData(Request $request): ?array
    {
        return $request->session()->get('flash', []);
    }

    private function getOldInput(Request $request): ?array
    {
        return $request->session()->get('_old_input', []);
    }
}
