<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\{Teacher, User};
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class TeacherUserController extends Controller
{
    public function create(Teacher $teacher)
    {
        $user = $teacher->user;

        if ($user->exists()) {
            return to_route('admin.teachers.users.edit', compact('teacher', 'user'));
        }

        return inertia('Admin/TeacherUser/Create', compact('teacher'));
    }

    public function edit(Teacher $teacher, User $user)
    {
        return inertia('Admin/TeacherUser/Edit', compact('teacher', 'user'));
    }

    //# ACTIONS

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

        $validatedData = $request->validate($rules);
        $user->update($validatedData);

        $message = 'Usuário atualizado com sucesso';

        return back()->with('message', $message);
    }

    public function destroy(User $user, Teacher $teacher)
    {
        //
    }
}
