<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{AcademicYear, Student, Teacher};

class DashboardController extends Controller
{
    public function __invoke()
    {
        $activeYear    = AcademicYear::select('id', 'year')->isActive();
        $groupsCount   = $activeYear->groups()->count();
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();

        $data = [
            'activeYear'    => $activeYear->year,
            'groupsCount'   => $groupsCount,
            'studentsCount' => $studentsCount,
            'teachersCount' => $teachersCount,
        ];

        return inertia('Admin/Dashboard', compact('data'));
    }
}
