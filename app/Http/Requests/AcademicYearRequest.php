<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AcademicYearRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $currentYear = date('Y');
        $nextYear = $currentYear + 1;

        $rules = [
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after:start_date',
        ];

        if ($this->isMethod('post')) {
            $rules['year'] = [
                'required',
                'integer',
                "between:{$currentYear},{$nextYear}",
                Rule::unique('academic_years', 'year'),
            ];
        };

        return $rules;
    }

    public function messages()
    {
        return [
            'year.required'   => 'O ano letivo é obrigatório.',
            'year.integer'    => 'O ano letivo deve ser um número.',
            'year.between'    => 'O ano letivo deve estar entre o ano atual, :min, e o próximo, :max.',
            'year.unique'     => 'O ano letivo informado já existe.',
            'start_date.date' => 'A data de início deve ser uma data válida.',
            'end_date.date'   => 'A data de término deve ser uma data válida.',
            'end_date.after'  => 'A data de término deve ser posterior à data de início.',
        ];
    }
}
