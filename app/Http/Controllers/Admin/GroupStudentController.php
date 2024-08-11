<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

use App\Models\{SchoolYear, Group, Student};

class GroupStudentController extends Controller
{
    public function index(Group $group)
    {
        $students = $group
            ->students()
            ->select('students.id', 'students.name', 'students.gender')
            ->orderBy('students.name')
            ->toBase()
            ->get();

        $data = compact('group', 'students');

        return inertia('Admin/GroupStudent/Index', compact('data'));
    }

    public function create(Request $request, Group $group)
    {
        $searchTerm = $request->query('search', '');
        $activeYear = SchoolYear::isActive();

        $students = Student::select('id', 'name', 'gender')
            ->whereDoesntHave('groups', function (Builder $query) use ($activeYear) {
                $query->where('school_year_id', $activeYear->id);
            })
            ->when($searchTerm, function (Builder $query) use ($searchTerm) {
                $query->where('id', $searchTerm)->orWhereLike('name', "%{$searchTerm}%");
            })
            ->orderBy('name')
            ->toBase()
            ->paginate(20);

        $data = compact('group', 'students');

        return inertia('Admin/GroupStudent/Create', compact('data'));
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
        $group->
        $message = sprintf('Aluno(a) %s removido(a) da turma do %s.', $student->name, $group->name);

        return back()
            ->withFlash(compact('message'));
    }
}
