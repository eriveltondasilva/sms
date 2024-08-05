<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

use App\Http\Requests\PersonRequest;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->query('search', '');

        $teachers = Teacher::select('id', 'name', 'email')
            ->when($searchTerm, function (Builder $query) use ($searchTerm) {
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
    public function store(PersonRequest $request)
    {
        $teacher = Teacher::create($request->validated());
        $teacherUrl = route('admin.teachers.show', $teacher->id);

        return back()->with(['message' => 'Cadastro do professor criado com sucesso!', 'link' => $teacherUrl]);
    }

    public function update(PersonRequest $request, Teacher $teacher)
    {
        $teacher->update($request->validated());

        return back()->with('message', 'Professor atualizado com sucesso!');
    }
}
