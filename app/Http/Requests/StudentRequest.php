<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return match ($this->method()) {
            'POST', 'PUT' => $this->store(),
            default  => [],
        };
    }

    private function store(): array
    {
        return [
            'name'       => 'required|string|max:100',
            'email'      => 'nullable|email|max:100',
            'rg'         => 'nullable|string|max:20',
            'cpf'        => 'required|string|max:20',
            'gender'     => 'required|in:M,F',
            'birthday'   => 'nullable|date|before:today',
            'phone'      => 'nullable|string|max:10',
            'birthplace' => 'nullable|string|max:100',
            //
            'gov_benefits'    => 'nullable|string|max:255',
            'health_problems' => 'nullable|string|max:255',
            'note'            => 'nullable|string|max:255',
            //
            'address_street'   => 'nullable|string|max:100',
            'address_city'     => 'nullable|string|max:100',
            'address_state'    => 'nullable|string|max:100',
            'address_zip_code' => 'nullable|string|max:100',
        ];
    }
}
