<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TeacherRequest;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $teachers = Teacher::query()
            ->select(['id', 'name', 'email'])
            ->filterBySearch($search)
            ->orderBy($search ? 'name' : 'id', $search ? 'asc' : 'desc');

        $teacherPagination = $teachers->paginate()->withQueryString();

        $data = compact('teacherPagination');

        return inertia('Admin/Teacher/Index', $data);
    }

    public function create()
    {
        return inertia('Admin/Teacher/Create');
    }

    public function show(Teacher $teacher)
    {
        return inertia('Admin/Teacher/Show', compact('teacher'));
    }

    public function edit(Teacher $teacher)
    {
        $teacher->load('user');

        dd($teacher->toArray());
        return inertia('Admin/Teacher/Edit', compact('teacher'));
    }

    // # ACTIONS
    public function store(TeacherRequest $request)
    {
        $teacher = Teacher::create($request->validated());
        $link    = route('admin.teachers.show', $teacher);
        $message = 'Cadastro do professor criado com sucesso!';

        $data = compact('message', 'link');

        return back()->withFlash($data);
    }

    public function update(TeacherRequest $request, Teacher $teacher)
    {
        $teacher->update($request->validated());
        $message = 'Professor atualizado com sucesso!';

        $data = compact('message');

        return back()->withFlash($data);
    }
}
