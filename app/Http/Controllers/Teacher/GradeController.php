<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

// use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function index()
    {
        return inertia('Teacher/Grade/Index');
    }
}
