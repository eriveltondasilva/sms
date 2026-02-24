<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Enums\UserPermission;
use App\Models\School;
use App\Models\SchoolYear;
use App\Models\User;
use App\Services\ImpersonationService;
use Illuminate\Http\Request;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    private const SIDEBAR_COOKIE = 'sidebar_state';

    protected $rootView = 'app';

    public function __construct(private readonly ImpersonationService $impersonation) {}

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /** @return array<string, mixed> */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name'        => (string) config('app.name'),
            'auth'        => fn (): array => $this->getAuth($request),
            'context'     => fn (): array => $this->getContext(),
            'sidebarOpen' => $this->getSidebarOpen($request),
        ];
    }

    // # ===== HELPERS =====

    /**
     * @return array{
     *   user: User|null,
     *   role: string|null,
     *   can: array<UserPermission, bool>,
     * }
     */
    private function getAuth(Request $request): array
    {
        /** @var User|null $user */
        $user = $request->user();

        if (! $user) {
            return ['user' => null, 'role' => null, 'can' => []];
        }

        return [
            'user' => $user,
            'role' => $user->getRoleNames()->first(),
            'can'  => collect(UserPermission::sidebar())
                ->mapWithKeys(
                    fn (UserPermission $permission): array => [
                        $permission->value => $user->hasPermissionTo($permission),
                    ]
                )
                ->all(),
        ];
    }

    /**
     * @return array{
     *   school: School|null,
     *   currentYear: SchoolYear|null,
     *   is_impersonated: bool,
     * }
     */
    private function getContext(): array
    {
        if (! has_school_context()) {
            return [
                'school'          => null,
                'currentYear'     => null,
                'is_impersonated' => false,
            ];
        }

        return [
            'school'          => current_school(),
            'currentYear'     => current_school_year(),
            'is_impersonated' => $this->impersonation->isActive(),
            // 'school'          => current_school()->only(['id', 'full_name', 'short_name', 'motto', 'is_active']),
            // 'currentYear'     => current_school_year()->only(['id', 'year', 'status', 'is_current']),
        ];
    }

    private function getSidebarOpen(Request $request): bool
    {
        if (! $request->hasCookie(self::SIDEBAR_COOKIE)) {
            return true;
        }

        return $request->cookie(self::SIDEBAR_COOKIE) === 'true';
    }
}
