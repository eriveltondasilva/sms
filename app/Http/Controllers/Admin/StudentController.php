<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\StudentRequest;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $gender = $request->query('gender');

        $students = Student::select(['id', 'name', 'gender'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('id', $search)
                        ->orWhereLike('name', $search . '%');
                });
            })
            ->when($gender, fn ($query) => $query->where('gender', $gender))
            ->when($search, function ($query) {
                $query->orderBy('name', 'asc');
            }, function ($query) {
                $query->orderBy('id', 'desc');
            })
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
    public function store(StudentRequest $request)
    {
        $student = Student::create($request->validated());
        $link = route('admin.students.show', $student);
        $message = 'Cadastro do aluno criado com sucesso!';

        return back()
            ->withFlash(compact('message', 'link'));
    }

    public function update(StudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        $message = 'Aluno atualizado com sucesso!';

        return to_route('admin.students.show', $student)
            ->withFlash(compact('message'));
    }
}
