<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\{SchoolYear, Group, Student};

class GroupStudentController extends Controller
{
    public function index(Group $group)
    {
        $students = $group
            ->students()
            ->select(['students.id', 'students.name', 'students.gender'])
            ->orderBy('students.name')
            ->toBase()
            ->get();

        return inertia('Admin/GroupStudent/Index', compact('group', 'students'));
    }

    public function create(Request $request, Group $group)
    {
        $search = $request->query('search', '');
        $activeYearId = SchoolYear::isActive()->id;

        $students = Student::query()
            ->select(['id', 'name', 'gender'])
            ->whereDoesntHave('groups', function ($query) use ($activeYearId) {
                $query->where('school_year_id', $activeYearId);
            })
            ->filterBySearch($search)
            ->orderBy('name')
            ->toBase();

        $studentPagination = $students->paginate();

        return inertia('Admin/GroupStudent/Create', compact('group', 'studentPagination'));
    }

    //# Actions
    public function store(Group $group, Student $student)
    {
        $group->students()->attach($student);
        $group->load('students');
        $message = sprintf('Aluno(a) %s adicionado(a) à turma do %s.', $student->name, $group->name);

        return back()
            ->withFlash(compact('message'));
    }

    public function destroy(Group $group, Student $student)
    {
        $group->students()->detach($student);
        $group->load('students');
        $message = sprintf('Aluno(a) %s removido(a) da turma do %s.', $student->name, $group->name);

        return back()
            ->withFlash(compact('message'));
    }
}
