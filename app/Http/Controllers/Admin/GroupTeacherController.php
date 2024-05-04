<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{Group, Teacher};
use Illuminate\Database\Eloquent\Builder;

class GroupTeacherController extends Controller
{
    public function index(Group $group)
    {
        $teachers = $group
            ->teachers()
            ->select('teachers.id', 'teachers.name', 'teachers.email')
            ->orderBy('teachers.name')
            ->get();

        return inertia('Admin/GroupTeacher/Index', compact('group', 'teachers'));
    }

    public function create(Group $group)
    {
        $teachers = Teacher::select('id', 'name', 'email')
            ->whereDoesntHave('groups', function (Builder $query) use ($group) {
                $query->where('group_id', $group->id);
            })
            ->orderBy('name')
            ->get();

        return inertia('Admin/GroupTeacher/Create', compact('group', 'teachers'));
    }

    //# Actions

    public function store(Group $group, Teacher $teacher)
    {
        $group->teachers()->attach($teacher);
        $group->load('teachers');

        $message = sprintf(
            'Professor(a) %s adicionado(a) à turma do %s.',
            $teacher->name,
            $group->name
        );

        return back()->with('message', $message);
    }

    public function destroy(Group $group, Teacher $teacher)
    {
        $group->teachers()->detach($teacher);
        $group->load('teachers');

        $message = sprintf(
            'Professor(a) %s removido(a) da turma do %s.',
            $teacher->name,
            $group->name
        );

        return back()->with('message', $message);
    }
}
