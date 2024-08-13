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
        $searchTerm = $request->query('search', '');

        $teachers = Teacher::select('id', 'name', 'email')
            ->when($searchTerm, function ($query) use ($searchTerm) {
                $query->where('id', $searchTerm)->orWhereLike('name', "%{$searchTerm}%");
            })
            ->orderByDesc('id')
            ->toBase()
            ->paginate(10);

        return inertia('Admin/Teacher/Index', compact('teachers'));
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
        return inertia('Admin/Teacher/Edit', compact('teacher'));
    }

    // # ACTIONS
    public function store(TeacherRequest $request)
    {
        $teacher = Teacher::create($request->validated());
        $link    = route('admin.teachers.show', $teacher);
        $message = 'Cadastro do professor criado com sucesso!';

        return back()
            ->withFlash(compact('message', 'link'));
    }

    public function update(TeacherRequest $request, Teacher $teacher)
    {
        $teacher->update($request->validated());

        return to_route('admin.teachers.show', $teacher)
            ->withMessage('Professor atualizado com sucesso!');
    }
}
