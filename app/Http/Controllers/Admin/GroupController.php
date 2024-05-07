<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Database\Eloquent\Builder;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::whereHas('academicYear', function (Builder $query) {
            $query->where('is_active', true);
        })
            ->withCount('students', 'teachers')
            ->get();

        return inertia('Admin/Group/Index', compact('groups'));
    }

    public function create()
    {
        return inertia('Admin/Group/Create');
    }

    public function edit(Group $group)
    {
        return inertia('Admin/Group/Edit', compact('group'));
    }
}
