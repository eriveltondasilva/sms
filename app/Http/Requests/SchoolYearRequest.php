<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SchoolYearRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return match ($this->method()) {
            'POST'  => $this->store(),
            'PUT'   => $this->update(),
            default => [],
        };
    }

    private function store(): array
    {
        $currentYear = date('Y');

        return [
            'year' => [
                'required',
                'integer',
                'between:' . $currentYear . ',' . ($currentYear + 1),
                Rule::unique('school_years'),
            ],
            ...$this->update(),
        ];
    }

    private function update(): array
    {
        return [
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after:start_date',
        ];
    }

    public function attributes(): array
    {
        return [
            'year' => 'ano letivo',
            'start_date' => 'início do ano letivo',
            'end_date' => 'fim do ano letivo',
        ];
    }
}
