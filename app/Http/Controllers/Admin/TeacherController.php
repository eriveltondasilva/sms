<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PersonRequest;
use App\Models\Teacher;
use App\Services\SearchService;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function __construct(
        protected SearchService $searchService
    ) {
    }

    public function index(Request $request)
    {
        $searchTerm = $request->query('search', '');

        $teachers = $this->searchService->searchByTerm(
            query: Teacher::query()->select('id', 'name', 'email'),
            searchTerm: $searchTerm,
        )->paginate(10);

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

    //# Actions

    public function store(PersonRequest $request)
    {
        $validatedData = $request->validated();
        $teacher = Teacher::create($validatedData);

        return back()
            ->with('message', 'Cadastro do professor criado com sucesso!')
            ->with('teacherId', $teacher->id);
    }

    public function update(PersonRequest $request, Teacher $teacher)
    {
        $validatedData = $request->validated();
        $teacher->update($validatedData);

        return back()->with('message', 'Professor atualizado com sucesso!');
    }
}
