<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

use App\Enums\RoleEnum;
use App\Models\{Teacher, User};

class TeacherUserController extends Controller
{
    public function create(Teacher $teacher)
    {
        $user = $teacher->user;

        if ($user) {
            $data = compact('teacher', 'user');

            return to_route('admin.teachers.users.edit', compact('data'));
        }

        return inertia('Admin/TeacherUser/Create', compact('teacher'));
    }

    public function edit(Teacher $teacher, User $user)
    {
        $data = compact('teacher', 'user');

        return inertia('Admin/TeacherUser/Edit', compact('data'));
    }

    // # ACTIONS
    public function store(Request $request, Teacher $teacher)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = $teacher->user()->create($validatedData);
        $user->assignRole(RoleEnum::TEACHER);

        $message = 'Usuário criado com sucesso';

        return to_route('admin.teachers.show', $teacher)->with('message', $message);
    }

    public function update(Request $request, Teacher $teacher, User $user)
    {
        $rules = [
            'username' => 'required|string|max:255',
            'email'    => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user)
            ]
        ];

        if ($request->filled('password')) {
            $rules['password'] = ['required', 'confirmed', Password::defaults()];
        }

        $user->update($request->validate($rules));
        $message = 'Usuário atualizado com sucesso';

        return back()->with('message', $message);
    }

    public function destroy(User $user, Teacher $teacher)
    {
        //
    }
}
