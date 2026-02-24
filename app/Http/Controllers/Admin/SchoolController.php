<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Data\FlashData;
use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

final class SchoolController extends Controller
{
    public function index(Request $request): Response
    {
        $schools = School::query()
            ->withCount(['users', 'schoolYears', 'students', 'teachers'])
            ->when(
                $request->string('search')->isNotEmpty(),
                fn ($q) => $q->where(function (Builder $q) use ($request): void {
                    $term = "%{$request->string('search')}%";
                    $q->where('full_name', 'ilike', $term)
                        ->orWhere('short_name', 'ilike', $term)
                        ->orWhere('cnpj', 'ilike', $term);
                })
            )
            ->when($request->status === 'active', fn ($q) => $q->active())
            ->when($request->status === 'inactive', fn ($q) => $q->inactive())
            ->latest()
            ->paginate(config('app.pagination.per_page'))
            ->withQueryString();

        return Inertia::render('admin/schools/index', [
            'schools' => $schools,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name'  => ['required', 'string', 'max:255'],
            'short_name' => ['required', 'string', 'max:50'],
            'motto'      => ['nullable', 'string', 'max:255'],
            'inep_code'  => ['nullable', 'string', 'size:8', 'unique:schools,inep_code'],
            'cnpj'       => ['required', 'digits:14', 'unique:schools,cnpj'],
            'phone'      => ['nullable', 'string', 'max:15'],
            'email'      => ['nullable', 'email', 'max:255'],
            'address'    => ['nullable', 'string', 'max:500'],
        ]);

        School::query()->create($validated);

        FlashData::success('Escola criada com sucesso.')->build();

        return back();
    }

    public function show(School $school): Response
    {
        $school->loadCount(['users', 'schoolYears', 'students', 'teachers']);

        $users = $school->users()
            ->with('roles:id,name,label,color')
            ->latest()
            ->paginate(10, ['*'], 'users_page');

        $schoolYears = $school->schoolYears()
            ->orderByDesc('year')
            ->get(['id', 'year', 'status', 'total_school_days', 'total_school_hours', 'created_at']);

        return Inertia::render('admin/schools/show', [
            'school'      => $school,
            'users'       => $users,
            'schoolYears' => $schoolYears,
        ]);
    }

    public function update(Request $request, School $school): RedirectResponse
    {
        $validated = $request->validate([
            'full_name'  => ['required', 'string', 'max:255'],
            'short_name' => ['required', 'string', 'max:50'],
            'motto'      => ['nullable', 'string', 'max:255'],
            'inep_code'  => ['nullable', 'string', 'size:8', Rule::unique('schools', 'inep_code')->ignore($school->id)],
            'cnpj'       => ['required', 'digits:14', Rule::unique('schools', 'cnpj')->ignore($school->id)],
            'phone'      => ['nullable', 'string', 'max:15'],
            'email'      => ['nullable', 'email', 'max:255'],
            'address'    => ['nullable', 'string', 'max:500'],
        ]);

        $school->update($validated);

        FlashData::success('Escola atualizada com sucesso.')->build();

        return back();
    }

    public function destroy(School $school): RedirectResponse
    {
        if ($school->students()->exists()) {
            FlashData::error('Não é possível excluir uma escola com alunos cadastrados.')->build();

            return back();
        }

        $school->delete();

        FlashData::success('Escola excluída com sucesso.')->build();

        return to_route('admin.schools.index');
    }

    public function toggleActive(School $school): RedirectResponse
    {
        $school->is_active ? $school->deactivate() : $school->activate();

        $label = $school->fresh()?->is_active ? 'ativada' : 'desativada';
        FlashData::success("Escola {$label} com sucesso.")->build();

        return back();
    }
}
