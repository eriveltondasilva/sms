<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\StudentRequest;
use App\Models\Student;

class StudentController extends Controller
{
    private const DEFAULT_PER_PAGE = 10;

    private function validateRequest(Request $request): void
    {
        $request->validate([
            'search'  => 'nullable|string|max:100',
            'gender'  => 'nullable|string|in:M,F',
            'perPage' => 'nullable|integer|min:1',
        ]);
    }

    public function index(Request $request)
    {
        // $this->validateRequest($request);

        $search = $request->query('search', '');
        $gender = $request->query('gender', '');
        $perPage = $request->query('perPage', self::DEFAULT_PER_PAGE);

        $students = Student::query()
            ->select(['id', 'name', 'gender'])
            ->filterBySearch($search)
            ->filterByGender($gender)
            ->orderBy(
                $search ? 'name' : 'id',
                $search ? 'asc' : 'desc'
            );

        $studentPagination = $students->paginate($perPage);

        return inertia('Admin/Student/Index', compact('studentPagination'));
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
