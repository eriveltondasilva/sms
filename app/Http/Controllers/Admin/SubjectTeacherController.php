<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{AcademicYear, Subject, Teacher};
use Illuminate\Database\Eloquent\Builder;

class SubjectTeacherController extends Controller
{
    public function index(Subject $subject)
    {
        $teachers = $subject
            ->teachers()
            ->select('teachers.id', 'teachers.name', 'teachers.cpf')
            ->orderBy('teachers.name')
            ->get();

        return inertia('Admin/SubjectTeacher/Index', compact('subject', 'teachers'));
    }

    public function create(Subject $subject)
    {
        $teachers = Teacher::select('id', 'name', 'cpf')
            ->whereDoesntHave('subjects', function (Builder $query) use ($subject) {
                $query->where('subject_id', $subject->id);
            })
            ->orderBy('name')
            ->get();

        return inertia('Admin/SubjectTeacher/Create', compact('subject', 'teachers'));
    }

    //# ACTION

    public function store(Subject $subject, Teacher $teacher)
    {
        $academicYearId = AcademicYear::isActive()->id;

        $subject->teachers()->attach($teacher, ['academic_year_id' => $academicYearId]);
        $subject->load('teachers');

        $message = sprintf(
            'Professor(a) %s adicionado(a) à disciplina de %s.',
            $teacher->name,
            $subject->name
        );

        return back()->with('message', $message);
    }

    public function destroy(Subject $subject, Teacher $teacher)
    {
        $subject->teachers()->detach($teacher);
        $subject->load('teachers');

        $message = sprintf(
            'Professor(a) %s removido(a) da disciplina de %s.',
            $teacher->name,
            $subject->name
        );

        return back()->with('message', $message);
    }
}
