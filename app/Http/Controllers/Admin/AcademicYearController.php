<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\AcademicYearRequest;
use App\Models\AcademicYear;

class AcademicYearController extends Controller
{
    public function index()
    {
        $academicYears = AcademicYear::query()
            ->latest('year')
            ->take(8)
            ->withCount('groups')
            ->toBase()
            ->get();

        return inertia('Admin/AcademicYear/Index', compact('academicYears'));
    }

    public function create()
    {
        return inertia('Admin/AcademicYear/Create');
    }

    public function edit(AcademicYear $academicYear)
    {
        $academicYear->load('quarters');

        return inertia('Admin/AcademicYear/Edit', compact('academicYear'));
    }

    public function show()
    {
        //
    }

    // # ACTIONS
    public function store(AcademicYearRequest $request)
    {
        $quarters = [
            ['name' => '1° Bimestre'],
            ['name' => '2° Bimestre'],
            ['name' => '3° Bimestre'],
            ['name' => '4° Bimestre'],
        ];

        $academicYear = AcademicYear::create($request->validated());
        $academicYear->groups()->createMany($quarters);

        $academicYearUrl = route('admin.academic-years.edit', $academicYear->id);
        $message = sprintf('Ano letivo de %d criado com sucesso!', $academicYear->year);

        return back()->with(['message' => $message, 'link' => $academicYearUrl]);
    }

    public function update(AcademicYearRequest $request, AcademicYear $academicYear)
    {
        $academicYear->update($request->validated());
        $message = sprintf('O ano letivo %d foi atualizado com sucesso!', $academicYear->year);

        return back()->with('message', $message);
    }

    public function updateStatus(AcademicYear $academicYear)
    {
        if ($academicYear->is_active) {
            $message = sprintf('O ano letivo %d já foi ativado.', $academicYear->year);

            return back()->with('message', $message);
        }

        AcademicYear::where('is_active', true)->update(['is_active' => false]);
        $academicYear->update(['is_active' => true]);

        $message = sprintf('O ano letivo %d foi ativado com sucesso!', $academicYear->year);

        return to_route('admin.academic-years.index')->with('message', $message);
    }
}
