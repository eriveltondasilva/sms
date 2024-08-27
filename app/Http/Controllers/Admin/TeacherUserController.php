<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Enums\RolesEnum;
use App\Http\Requests\TeacherUserRequest;
use App\Models\{Teacher, User};

class TeacherUserController extends Controller
{
    public function create(Teacher $teacher)
    {
        $user = $teacher->user;

        if (! $user) {
            return inertia('Admin/TeacherUser/Create', compact('teacher'));
        }
        
        return to_route('admin.teachers.users.edit', compact('teacher', 'user'));
    }

    public function edit(Teacher $teacher, User $user)
    {
        return inertia('Admin/TeacherUser/Edit', compact('teacher', 'user'));
    }

    // # ACTIONS
    public function store(TeacherUserRequest $request, Teacher $teacher)
    {
        $user = $teacher->user()->create($request->validated());
        $user->assignRole(RolesEnum::TEACHER);
        $message = 'Usuário criado com sucesso';

        return to_route('admin.teachers.show', $teacher)
            ->withFlash(compact('message'));
    }

    public function update(TeacherUserRequest $request, Teacher $teacher, User $user)
    {
        $user->update($request->validated());
        $message = 'Usuário atualizado com sucesso';

        return back()
            ->withFlash(compact('message'));
    }
}
