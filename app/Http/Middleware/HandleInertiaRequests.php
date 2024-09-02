<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

use App\Models\SchoolYear;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string | null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth'  => fn () => $this->getAuthUserData($request),
            'flash' => fn () => $this->getFlashData($request),
        ];
    }

    private function getAuthUserData(Request $request): array | null
    {
        if (!auth()->check()) {
            return null;
        }

        $userData = $request->user();

        $user = Cache::remember("user_data_{$userData->id}", 60 * 10, function () use ($userData) {
            return $userData->only(['id', 'username', 'email', 'avatar_url', 'role']);
        });
        $activeYear = SchoolYear::select(['id', 'year'])->isActive();

        return compact('user', 'activeYear');
    }

    private function getFlashData(Request $request): array | null
    {
        return $request->session()->get('flash');
    }
}
