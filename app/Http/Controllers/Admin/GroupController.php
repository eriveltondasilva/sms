<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\GroupRequest;
use App\Models\Group;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::query()
            ->whereHas('schoolYear', fn ($query) => $query->where('is_active', true))
            ->withCount(['students', 'teachers'])
            ->toBase()
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

    // # ACTIONS
    public function store(GroupRequest $request)
    {
        $group   = Group::create($request->validated());
        $link    = route('admin.groups.edit', $group);
        $message = sprintf('Turma do %s criada com sucesso!', $group->name);

        return back()
            ->withFlash(compact('message', 'link'));
    }

    public function update(GroupRequest $request, Group $group)
    {
        $group->update($request->validated());
        $message = sprintf('Turma do %s atualizada com sucesso!', $group->name);

        return back()
            ->withFlash(compact('message'));
    }

    public function destroy(Group $group)
    {
        $group->delete();
        $message = sprintf('Turma do %s excluída com sucesso!', $group->name);

        return back()
            ->withFlash(compact('message'));
    }
}
