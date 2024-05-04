<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PersonRequest;
use App\Models\Student;
use App\Services\SearchService;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function __construct(protected SearchService $search)
    {
    }

    public function index(Request $request)
    {
        $searchTerm = $request->query('search', '');

        $students = $this->search->searchByTerm(
            query: Student::query()->select('id', 'name', 'gender'),
            searchTerm: $searchTerm,
        )->paginate(20);

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

    //# Actions

    public function store(PersonRequest $request)
    {
        $validatedData = $request->validated();
        $student = Student::create($validatedData);

        return back()
            ->with('message', 'Cadastro do aluno criado com sucesso!')
            ->with('studentId', $student->id);
    }

    public function update(PersonRequest $request, Student $student)
    {
        $validatedData = $request->validated();
        $student->update($validatedData);

        return back()->with('message', 'Aluno atualizado com sucesso!');
    }
}
