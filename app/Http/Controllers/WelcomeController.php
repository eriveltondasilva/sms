<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $laravelVersion = Application::VERSION;
        $phpVersion     = PHP_VERSION;

        return inertia('Welcome', compact('laravelVersion', 'phpVersion'));
    }
}
