<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class CalendarController extends Controller
{
    public function index()
    {
        return inertia('Admin/Calendar');
    }
}
