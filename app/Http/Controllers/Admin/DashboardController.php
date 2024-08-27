<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{SchoolYear, Student, Teacher};

class DashboardController extends Controller
{
    public function index()
    {
        $activeYear = SchoolYear::isActive();
        
        $groupsCount   = $activeYear->groups()->count();
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();

        return inertia('Admin/Dashboard', compact('activeYear', 'groupsCount', 'studentsCount', 'teachersCount'));
    }
}
