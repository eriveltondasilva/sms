<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{SchoolYear, Student, Teacher};

class DashboardController extends Controller
{
    public function index()
    {
        $groupsCount   = SchoolYear::isActive()->groups()->count();
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();

        return inertia('Admin/Dashboard', compact('groupsCount', 'studentsCount', 'teachersCount'));
    }
}
