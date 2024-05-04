<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

// use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function __invoke()
    {
        return inertia('Teacher/Calendar');
    }
}
