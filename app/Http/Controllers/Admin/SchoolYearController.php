<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\SchoolYearRequest;
use App\Models\SchoolYear;

class SchoolYearController extends Controller
{
    public function index()
    {
        $schoolYears = SchoolYear::query()
            ->latest('year')
            ->take(8)
            ->withCount('groups')
            ->toBase()
            ->get();

        return inertia('Admin/SchoolYear/Index', compact('schoolYears'));
    }

    public function create()
    {
        return inertia('Admin/SchoolYear/Create');
    }

    public function edit(SchoolYear $schoolYear)
    {
        $schoolYear->load('quarters');

        return inertia('Admin/SchoolYear/Edit', compact('schoolYear'));
    }

    public function show()
    {
        //
    }

    // # ACTIONS
    public function store(SchoolYearRequest $request)
    {
        $quarters = [
            ['name' => '1° Bimestre'],
            ['name' => '2° Bimestre'],
            ['name' => '3° Bimestre'],
            ['name' => '4° Bimestre'],
        ];

        $schoolYear = SchoolYear::create($request->validated());
        $schoolYear->groups()->createMany($quarters);

        $schoolYearUrl = route('admin.school-years.edit', $schoolYear->id);
        $message = sprintf('Ano letivo de %d criado com sucesso!', $schoolYear->year);

        return back()->with(['message' => $message, 'link' => $schoolYearUrl]);
    }

    public function update(SchoolYearRequest $request, SchoolYear $schoolYear)
    {
        $schoolYear->update($request->validated());
        $message = sprintf('O ano letivo %d foi atualizado com sucesso!', $schoolYear->year);

        return back()->with('message', $message);
    }

    public function updateStatus(SchoolYear $schoolYear)
    {
        if ($schoolYear->is_active) {
            $message = sprintf('O ano letivo %d já foi ativado.', $schoolYear->year);

            return back()->with('message', $message);
        }

        SchoolYear::where('is_active', true)->update(['is_active' => false]);
        $schoolYear->update(['is_active' => true]);

        $message = sprintf('O ano letivo %d foi ativado com sucesso!', $schoolYear->year);

        return to_route('admin.school-years.index')->with('message', $message);
    }
}
