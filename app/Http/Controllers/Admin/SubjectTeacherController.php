<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;

use App\Models\{SchoolYear, Subject, Teacher};

class SubjectTeacherController extends Controller
{
    public function index(Subject $subject)
    {
        $teachers = $subject
            ->teachers()
            ->select('teachers.id', 'teachers.name', 'teachers.cpf')
            ->orderBy('teachers.name')
            ->toBase()
            ->get();

        $data = compact('subject', 'teachers');

        return inertia('Admin/SubjectTeacher/Index', compact('data'));
    }

    public function create(Subject $subject)
    {
        $teachers = Teacher::select('id', 'name', 'cpf')
            ->whereDoesntHave('subjects', function (Builder $query) use ($subject) {
                $query->where('subject_id', $subject->id);
            })
            ->orderBy('name')
            ->toBase()
            ->get();

        $data = compact('subject', 'teachers');

        return inertia('Admin/SubjectTeacher/Create', compact('data'));
    }

    //# ACTION
    public function store(Subject $subject, Teacher $teacher)
    {
        $schoolYearId = SchoolYear::isActive()->id;
        $subject->teachers()->attach($teacher, ['school_year_id' => $schoolYearId]);
        $subject->load('teachers');
        $message = sprintf('Professor(a) %s adicionado(a) à disciplina de %s.', $teacher->name, $subject->name);

        return back()
            ->withFlash(compact('message'));
    }

    public function destroy(Subject $subject, Teacher $teacher)
    {
        $subject->teachers()->detach($teacher);
        $subject->load('teachers');
        $message = sprintf('Professor(a) %s removido(a) da disciplina de %s.', $teacher->name, $subject->name);

        return back()
            ->withFlash(compact('message'));
    }
}
