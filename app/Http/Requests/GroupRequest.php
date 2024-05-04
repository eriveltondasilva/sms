<?php

namespace App\Http\Requests;

use App\Models\AcademicYear;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GroupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'classroom' => 'nullable|string|max:255',
            'shift' => 'nullable|string|max:255',
        ];

        if ($this->isMethod('POST')) {
            $activeAcademicYearId = AcademicYear::IsActive()->id;

            $rules['name'] = [
                'required',
                'string',
                'max:255',
                Rule::unique('groups')->where(function ($query) use ($activeAcademicYearId) {
                    return $query->where('academic_year_id', $activeAcademicYearId);
                })
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome da turma é obrigatório.',
            'name.unique' => 'A turma informada já existe.',
        ];
    }
}
