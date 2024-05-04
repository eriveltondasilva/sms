<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{AcademicYear, Student, Teacher};

class DashboardController extends Controller
{
    public function __invoke()
    {
        $academicYear = AcademicYear::select('id', 'year')->isActive();
        $activeYear = $academicYear->year;

        $groupsCount = optional($academicYear)->groups()->count() ?? 0;
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();

        $data = compact('activeYear', 'groupsCount', 'studentsCount', 'teachersCount');
        $message = 'Bem-vindo(a)! Você está logado(a) como administrador(a).';

        return inertia('Admin/Dashboard', compact('data'))->with('message', $message);
    }
}
