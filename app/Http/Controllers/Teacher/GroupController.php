<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\{AcademicYear, Group};
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $groupId        = $request->query('search', '');
        $activeYear     = AcademicYear::isActive();
        $teacherProfile = Auth::user()->profile;

        $teacherGroups = $teacherProfile->groups()->select('groups.id', 'groups.name')->get();

        $selectedGroup = Group::query()
            ->with(['students' => function ($query) {
                $query
                    ->orderBy('students.name')
                    ->select('students.id', 'students.name');
            }])
            ->whereHas('teachers', function (Builder $query) use ($teacherProfile) {
                $query->where('teachers.id', $teacherProfile->id);
            })
            ->find($groupId);

        $data = [
            'activeYear'    => $activeYear->year,
            'selectedGroup' => $selectedGroup,
            'teacherGroups' => $teacherGroups,
        ];

        return inertia('Teacher/Group/Index', compact('data'));
    }
}
