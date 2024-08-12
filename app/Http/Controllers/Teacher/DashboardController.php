<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\SchoolYear;

// use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $schoolYear = SchoolYear::isActive();
        $activeYear = $schoolYear->year;

        $teacherProfile = Auth::user()->profile;

        $groups = $teacherProfile->groups()
            ->where('school_year_id', $schoolYear->id)
            ->withCount('students')
            ->toBase()
            ->get();

        $groupsCount   = $groups->count();
        $studentsCount = $groups->sum('students_count');

        $data = compact('activeYear', 'groupsCount', 'studentsCount');

        return inertia('Teacher/Dashboard', compact('data'));
    }
}
