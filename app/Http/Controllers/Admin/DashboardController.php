<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{SchoolYear, Student, Teacher};

class DashboardController extends Controller
{
    public function index()
    {
        $schoolYear  = SchoolYear::isActive();
        $groupsCount   = $schoolYear->groups()->count();
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();
        $activeYear    = $schoolYear->year;

        $data = compact('activeYear', 'groupsCount', 'studentsCount', 'teachersCount');

        return inertia('Admin/Dashboard', compact('data'));
    }
}
