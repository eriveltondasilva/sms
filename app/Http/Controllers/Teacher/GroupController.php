<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\SchoolYear;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $groupId = $request->query('search', '');

        $activeYear = SchoolYear::isActive();
        $teacherProfile = Auth::user()->profile;

        $teacherGroups = $teacherProfile->groups()
            ->where('school_year_id', $activeYear->id)
            ->select('groups.id', 'groups.name')
            ->get();

        $selectedGroup = $teacherGroups->where('id', $groupId)->first();
        $selectedGroup?->load(['students' => function ($query) {
            $query->orderBy('name')->select('students.id', 'students.name', 'students.gender');
        }]);

        return inertia('Teacher/Group/Index', compact('activeYear', 'selectedGroup', 'teacherGroups'));
    }
}
