<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GroupRequest;
use App\Models\{AcademicYear, Group};

class GroupActionsController extends Controller
{
    public function store(GroupRequest $request)
    {
        $activeYearId = AcademicYear::isActive()->id;

        if (!$activeYearId) {
            return back()->with('message', 'Ano letivo atual não configurado!');
        }

        $validatedData = $request->validated();
        $validatedData['academic_year_id'] = $activeYearId;
        $group = Group::create($validatedData);

        $message = sprintf('Turma do %s criada com sucesso!', $group->name);

        return back()->with('message', $message)->with('groupId', $group->id);
    }

    public function update(GroupRequest $request, Group $group)
    {
        $validatedData = $request->validated();
        $group->update($validatedData);

        $message = sprintf('Turma do %s atualizada com sucesso!', $group->name);

        return back()->with('message', $message);
    }
}
