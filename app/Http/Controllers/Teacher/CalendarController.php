<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

// use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index()
    {
        return inertia('Teacher/Calendar');
    }
}
