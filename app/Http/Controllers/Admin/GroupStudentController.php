<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{AcademicYear, Group, Student};
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class GroupStudentController extends Controller
{
    public function index(Group $group)
    {
        $students = $group
            ->students()
            ->select('students.id', 'students.name', 'students.gender')
            ->orderBy('students.name')
            ->get();

        $data = compact('group', 'students');

        return inertia('Admin/GroupStudent/Index', compact('data'));
    }

    public function create(Request $request, Group $group)
    {
        $searchTerm = $request->query('search', '');
        $activeYear = AcademicYear::isActive();

        $studentsQuery = Student::select('id', 'name', 'gender')
            ->whereDoesntHave('groups', function (Builder $query) use ($activeYear) {
                $query->where('academic_year_id', $activeYear->id);
            })
            ->when($searchTerm, function (Builder $query) use ($searchTerm) {
                $query->where('id', $searchTerm)->orWhere('name', 'like', "%{$searchTerm}%");
            })
            ->orderBy('name');

        $students = $studentsQuery->paginate(20);
        $data = compact('group', 'students');

        return inertia('Admin/GroupStudent/Create', compact('data'));
    }

    //# Actions
    public function store(Group $group, Student $student)
    {
        $group->students()->attach($student);
        $group->load('students');

        $message = sprintf('Aluno(a) %s adicionado(a) à turma do %s.', $student->name, $group->name);

        return back()->with('message', $message);
    }

    public function destroy(Group $group, Student $student)
    {
        $group->students()->detach($student);
        $group->load('students');

        $message = sprintf('Aluno(a) %s removido(a) da turma do %s.', $student->name, $group->name);

        return back()->with('message', $message);
    }
}
