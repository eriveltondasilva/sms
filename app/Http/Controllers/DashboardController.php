<?php

namespace App\Http\Controllers;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return to_route('admin.dashboard');
        }

        if ($user->hasRole('teacher')) {
            return to_route('teacher.dashboard');
        }

        if ($user->hasRole('student')) {
            return to_route('student.dashboard');
        }

        $message = 'Alguma coisa deu errado. Você não tem permissão para acessar esta página.';

        return inertia('Dashboard')->with('message', $message);
    }
}
