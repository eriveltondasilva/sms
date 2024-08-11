<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherRequest extends FormRequest
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
            'name'     => 'required|string|max:100',
            'email'    => 'nullable|email|max:100',
            'rg'       => 'nullable|string|max:20',
            'cpf'      => 'required|string|max:20',
            'gender'   => 'required|in:M,F',
            'phone'    => 'nullable|string|max:10',
            'birthday' => 'nullable|date|before:today',
            //
            'address_street'   => 'nullable|string|max:100',
            'address_city'     => 'nullable|string|max:100',
            'address_state'    => 'nullable|string|max:100',
            'address_zip_code' => 'nullable|string|max:100',
        ];
    }
}
