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
        $id = $this->route('teacher')->id ?? '';

        return [
            'name'     => 'required|string|max:100',
            'email'    => 'nullable|email|max:100|unique:teachers,email,' . $id,
            'rg'       => 'nullable|string|max:20|unique:teachers,rg,' . $id,
            'cpf'      => 'nullable|string|max:20|unique:teachers,cpf,' . $id,
            'gender'   => 'required|in:M,F',
            'phone'    => 'nullable|string|max:16',
            'birthday' => 'nullable|date|before:today',
            //
            'address_street'   => 'nullable|string|max:100',
            'address_city'     => 'nullable|string|max:100',
            'address_state'    => 'nullable|string|max:100',
            'address_zip_code' => 'nullable|string|max:100',
        ];
    }

    public function attributes(): array
    {
        return [
            'name'     => 'nome',
            'email'    => 'e-mail',
            'rg'       => 'rg',
            'cpf'      => 'cpf',
            'gender'   => 'gênero',
            'phone'    => 'celular',
            'birthday' => 'data de nascimento',
            //
            'address_street'   => 'rua',
            'address_city'     => 'cidade',
            'address_state'    => 'estado',
            'address_zip_code' => 'cep',
        ];
    }
}
