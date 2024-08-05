<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

use App\Http\Requests\PersonRequest;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->query('search', '');

        $students = Student::select('id', 'name', 'gender')
            ->when($searchTerm, function (Builder $query) use ($searchTerm) {
                $query->where('id', $searchTerm)->orWhereLike('name', "%{$searchTerm}%");
            })
            ->orderByDesc('id')
            ->toBase()
            ->paginate(20);

        return inertia('Admin/Student/Index', compact('students'));
    }

    public function create()
    {
        return inertia('Admin/Student/Create');
    }

    public function show(Student $student)
    {
        return inertia('Admin/Student/Show', compact('student'));
    }

    public function edit(Student $student)
    {
        return inertia('Admin/Student/Edit', compact('student'));
    }

    // # ACTIONS
    public function store(PersonRequest $request)
    {
        $student = Student::create($request->validated());
        $studentUrl = route('admin.students.show', $student->id);

        return back()->with(['message' => 'Cadastro do aluno criado com sucesso!', 'link' => $studentUrl]);
    }

    public function update(PersonRequest $request, Student $student)
    {
        $student->update($request->validated());

        return back()->with('message', 'Aluno atualizado com sucesso!');
    }
}
