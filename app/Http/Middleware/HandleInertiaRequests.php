<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\AcademicYear;

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
        $user =  $request->user();

        if (!$user) {
            return ['user' => null];
        }

        $user->load('roles');

        $userData = $user->only('id', 'username', 'email', 'avatar_url');
        $role     = $user->roles->pluck('name')->first() ?? 'user';

        $activeYear = AcademicYear::IsActive()->year;

        return [
            'user'       => array_merge($userData, ['role' => $role]),
            'activeYear' => $activeYear,
        ];
    }

    private function getFlashData(Request $request): array
    {
        return $request->session()->only(['status', 'message']);
    }
}
