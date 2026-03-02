<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Data\FlashData;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

final class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->with(['roles:id,name', 'school:id,full_name,short_name'])
            ->when(
                $request->filled('search'),
                fn ($query) => $query->whereAny(['name', 'email'], 'ilike', "%{$request->search}%")
            )
            ->when(
                $request->filled('role'),
                fn ($query) => $query->whereHas('roles', fn (Builder $q) => $q->where('name', $request->role))
            )
            ->when(
                $request->filled('is_active'),
                fn ($query) => $query->where('is_active', $request->boolean('is_active'))
            )
            ->latest()
            ->paginate(config('app.pagination.per_page'))
            ->withQueryString();

        $roles = Role::query()->all();
        $filters = $request->only(['search', 'role', 'is_active']);

        return Inertia::render('admin/users/index', [
            'users'   => fn () => $users,
            'roles'   => fn () => $roles,
            'filters' => fn () => $filters,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'              => ['required', 'confirmed', Password::defaults()],
            'password_confirmation' => ['required'],
        ]);

        $user = User::query()->create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole(UserRole::SUPER_ADMIN);

        FlashData::success('Usuário criado com sucesso.')->send();

        return back();
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password'              => ['nullable', 'confirmed', Password::defaults()],
            'password_confirmation' => ['nullable'],
        ]);

        $data = [
            'name'  => $validated['name'],
            'email' => $validated['email'],
        ];

        if (! empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        FlashData::success('Usuário atualizado com sucesso.')->send();

        return back();
    }

    public function destroy(User $user): RedirectResponse
    {
        if (Auth::id() === $user->id) {
            FlashData::error('Você não pode excluir seu próprio usuário.')->send();

            return back();
        }

        $user->delete();

        FlashData::success('Usuário excluído com sucesso.')->send();

        return back();
    }
}
