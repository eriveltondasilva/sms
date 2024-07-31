<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use Illuminate\Support\Facades\Auth;

// use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $activeYear     = AcademicYear::isActive();
        $teacherProfile = Auth::user()->profile;

        $groups = $teacherProfile->groups()
            ->where('academic_year_id', $activeYear->id)
            ->withCount('students')
            ->get();

        $groupsCount   = $groups->count();
        $studentsCount = $groups->sum('students_count');

        $data = [
            'activeYear'    => $activeYear->year,
            'groupsCount'   => $groupsCount,
            'studentsCount' => $studentsCount,
        ];

        return inertia('Teacher/Dashboard', compact('data'));
    }
}
