<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $message = 'Você é um(a) aluno(a). Por favor, tente novamente mais tarde.';

        return inertia('Dashboard')->with('message', $message);;
    }
}
