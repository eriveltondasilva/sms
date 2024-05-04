<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AcademicYearRequest;
use App\Models\AcademicYear;

class AcademicYearController extends Controller
{
    public function index()
    {
        $academicYears = AcademicYear::latest('year')
            ->take(8)
            ->withCount('groups')
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

    //# Actions

    public function store(AcademicYearRequest $request)
    {
        $quarters = [
            ['name' => '1° Bimestre'],
            ['name' => '2° Bimestre'],
            ['name' => '3° Bimestre'],
            ['name' => '4° Bimestre'],
        ];

        $validatedData = $request->validated();
        $academicYear = AcademicYear::create($validatedData);
        $academicYear->groups()->createMany($quarters);

        $message = sprintf(
            'Ano letivo de %d criado com sucesso!',
            $academicYear->year
        );

        return back()->with('message', $message)->with('academicYearId', $academicYear->id);
    }

    public function update(AcademicYearRequest $request, AcademicYear $academicYear)
    {
        $validatedData = $request->validated();
        $academicYear->update($validatedData);

        $message = sprintf(
            'O ano letivo %d foi atualizado com sucesso!',
            $academicYear->year
        );

        return back()->with('message', $message);
    }

    public function updateStatus(AcademicYear $academicYear)
    {
        if ($academicYear->is_active) {
            $message = sprintf(
                'O ano letivo %d já foi ativado.',
                $academicYear->year
            );

            return back()->with('message', $message);
        }

        AcademicYear::where('is_active', true)->update(['is_active' => false]);
        $academicYear->update(['is_active' => true]);

        $message = sprintf(
            'O ano letivo %d foi ativado com sucesso!',
            $academicYear->year
        );

        return to_route('admin.academic-years.index')->with('message', $message);
    }
}
