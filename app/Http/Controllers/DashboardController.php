<?php

namespace App\Http\Controllers;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return to_route('admin.dashboard')
                ->withFlash(['message' => 'Seja bem-vindo, administrador!']);
        }

        if ($user->hasRole('teacher')) {
            return to_route('teacher.dashboard')
                ->withFlash(['message' => 'Seja bem-vindo, professor!']);
        }

        if ($user->hasRole('student')) {
            return to_route('student.dashboard')
                ->withFlash(['message' => 'Seja bem-vindo, estudante!']);
        }

        return inertia('Dashboard');
    }
}
