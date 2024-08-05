<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\AcademicYear;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $groupId = $request->query('search', '');

        $academicYear = AcademicYear::isActive();
        $activeYear = $academicYear->year;

        $teacherProfile = Auth::user()->profile;

        $teacherGroups = $teacherProfile->groups()
            ->where('academic_year_id', $academicYear->id)
            ->select('groups.id', 'groups.name')
            ->get();

        $selectedGroup = $teacherGroups->where('id', $groupId)->first();
        $selectedGroup?->load(['students' => function ($query) {
            $query->orderBy('name')->select('students.id', 'students.name', 'students.gender');
        }]);

        $data = compact('activeYear', 'selectedGroup', 'teacherGroups');

        return inertia('Teacher/Group/Index', compact('data'));
    }
}
