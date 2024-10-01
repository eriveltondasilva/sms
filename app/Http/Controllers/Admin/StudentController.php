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

        $students = Student::query()
            ->select(['id', 'name', 'gender'])
            ->filterBySearch($search)
            ->filterByGender($gender)
            ->orderBy(
                $search ? 'name' : 'id',
                $search ? 'asc' : 'desc'
            );

        $studentPagination = $students->paginate()->withQueryString();

        $data = compact('studentPagination');

        return inertia('Admin/Student/Index', $data);
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

        $data = compact('message', 'link');

        return back()->withFlash($data);
    }

    public function update(StudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        $message = 'Aluno atualizado com sucesso!';

        $data = compact('message');

        return back()->withFlash($data);
    }
}
