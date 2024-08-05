<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;

use App\Http\Requests\GroupRequest;
use App\Models\{AcademicYear,Group};

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::query()
            ->whereHas('academicYear', function (Builder $query) {
                $query->where('is_active', true);
            })
            ->withCount('students', 'teachers')
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
        $activeYearId = AcademicYear::isActive()->id;

        if (!$activeYearId) {
            return back()->with('message', 'Ano letivo atual não configurado!');
        }

        $validatedData = $request->validated();
        $validatedData['academic_year_id'] = $activeYearId;
        $group = Group::create($validatedData);

        $groupUrl = route('admin.groups.edit', $group->id);
        $message = sprintf('Turma do %s criada com sucesso!', $group->name);

        return back()->with(['message' => $message, 'link' => $groupUrl]);
    }

    public function update(GroupRequest $request, Group $group)
    {
        $group->update($request->validated());
        $message = sprintf('Turma do %s atualizada com sucesso!', $group->name);

        return back()->with('message', $message);
    }
}
