<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{SchoolYear, Student, Teacher};

class DashboardController extends Controller
{
    public function index()
    {
        $schoolYear    = SchoolYear::isActive();
        $activeYear    = $schoolYear->year;
        $groupsCount   = $schoolYear->groups()->count();
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();

        $data = compact('activeYear', 'groupsCount', 'studentsCount', 'teachersCount');

        return inertia('Admin/Dashboard', compact('data'));
    }
}
