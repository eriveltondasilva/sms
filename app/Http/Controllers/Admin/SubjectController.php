<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;

class SubjectController extends Controller
{
    public function index()
    {
        // TODO: restringir as disciplinas para o ano corrente
        $subjects = Subject::query()
            ->withCount('teachers')
            ->toBase()
            ->get();

        return inertia('Admin/Subject/Index', compact('subjects'));
    }
}
