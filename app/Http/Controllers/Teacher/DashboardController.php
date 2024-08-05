<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\AcademicYear;

// use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $academicYear = AcademicYear::isActive();
        $activeYear = $academicYear->year;

        $teacherProfile = Auth::user()->profile;

        $groups = $teacherProfile->groups()
            ->where('academic_year_id', $academicYear->id)
            ->withCount('students')
            ->toBase()
            ->get();

        $groupsCount   = $groups->count();
        $studentsCount = $groups->sum('students_count');

        $data = compact('activeYear', 'groupsCount', 'studentsCount');

        return inertia('Teacher/Dashboard', compact('data'));
    }
}
