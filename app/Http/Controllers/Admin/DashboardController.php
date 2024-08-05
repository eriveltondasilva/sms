<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{AcademicYear, Student, Teacher};

class DashboardController extends Controller
{
    public function __invoke()
    {
        $academicYear  = AcademicYear::isActive();
        $groupsCount   = $academicYear->groups()->count();
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();
        $activeYear    = $academicYear->year;

        $data = compact('activeYear', 'groupsCount', 'studentsCount', 'teachersCount');

        return inertia('Admin/Dashboard', compact('data'));
    }
}
