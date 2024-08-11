<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use App\Models\SchoolYear;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth'  => $this->getAuthUserData($request),
            'flash' => $this->getFlashData($request),
        ];
    }

    private function getAuthUserData(Request $request): array
    {
        $user = $request->user();

        if (!$user) {
            return [
                'activeYear' => null,
                'user'       => null,
            ];
        }

        $userData   = $user->only(['id', 'username', 'email', 'avatar_url']);
        $role       = $user->getRoleNames()[0];
        $activeYear = SchoolYear::isActive();

        return [
            'activeYear' => $activeYear,
            'user'       => [...$userData, 'role' => $role],
        ];
    }

    private function getFlashData(Request $request): array
    {
        return $request->session()->only(['message', 'link']);
    }
}
