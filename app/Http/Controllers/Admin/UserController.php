<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Data\FlashData;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

final class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->role(UserRole::SUPER_ADMIN->value)
            ->when(
                $request->string('search')->isNotEmpty(),
                fn ($q) => $q->where(function ($q) use ($request): void {
                    $term = "%{$request->string('search')}%";
                    $q->where('name', 'ilike', $term)
                        ->orWhere('email', 'ilike', $term);
                })
            )
            ->latest()
            ->paginate(config('app.pagination.per_page'))
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users'       => $users,
            'filters'     => $request->only(['search']),
            'currentUser' => Auth::id(),
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

        FlashData::success('Usuário criado com sucesso.')->build();

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

        FlashData::success('Usuário atualizado com sucesso.')->build();

        return back();
    }

    public function destroy(User $user): RedirectResponse
    {
        if (Auth::id() === $user->id) {
            FlashData::error('Você não pode excluir seu próprio usuário.')->build();

            return back();
        }

        $user->delete();

        FlashData::success('Usuário excluído com sucesso.')->build();

        return back();
    }
}
