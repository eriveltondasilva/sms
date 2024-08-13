<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::toBase()->get()->ds();

        return inertia('Admin/User/Index', compact('users'));
    }
}
