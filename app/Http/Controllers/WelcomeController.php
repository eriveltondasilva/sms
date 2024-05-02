<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

// use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $canLogin       = Route::has('login');
        $canRegister    = Route::has('register');
        $laravelVersion = Application::VERSION;
        $phpVersion     = PHP_VERSION;

        $data = compact('canLogin', 'canRegister', 'laravelVersion', 'phpVersion');

        return Inertia::render('Welcome', compact('data'));
    }
}
