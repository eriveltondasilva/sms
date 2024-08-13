<?php

namespace App\Http\Requests;

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
        return match ($this->method()) {
            'POST'   => $this->store(),
            'PUT'    => $this->update(),
            'DELETE' => [],
            default  => [],
        };
    }

    private function store(): array
    {
        return array_merge($this->update(), [
            'name' => [
                'required',
                'string',
                'max:10',
                Rule::unique('groups')->where('school_year_id', $this->input('school_year_id')),
            ],
            'school_year_id' => 'required|integer|exists:school_years,id',
        ]);
    }

    private function update(): array
    {
        return [
           'classroom' => 'nullable|string|max:100',
           'shift'     => 'nullable|string|max:10',
        ];
    }

    public function attributes(): array
    {
        return [
            'name'           => 'nome da turma',
            'classroom'      => 'sala de aula',
            'shift'          => 'turno',
            'school_year_id' => 'ano letivo',
        ];
    }
}
