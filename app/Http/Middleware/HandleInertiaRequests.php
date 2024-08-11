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
            'auth'  => fn () => $this->getAuthUserData($request),
            'flash' => fn () => $this->getFlashData($request),
        ];
    }

    private function getAuthUserData(Request $request): array
    {
        $userData = $request->user();

        if (!$userData) {
            return [
                'activeYear' => null,
                'user'       => null,
            ];
        }

        $user       = $userData->only(['id', 'username', 'email', 'avatar_url', 'role']);
        $activeYear = SchoolYear::select('id', 'year')->isActive();

        return compact('user', 'activeYear');
    }

    private function getFlashData(Request $request)
    {
        return $request->session()->get('flash') ?? [];
    }
}
