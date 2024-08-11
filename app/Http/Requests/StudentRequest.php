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
        $id = $this->route('student')->id ?? '';

        return [
            'name'       => 'required|string|max:100',
            'email'      => 'nullable|email|max:100|unique:students,email,' . $id,
            'rg'         => 'nullable|string|max:20|unique:students,rg,' . $id,
            'cpf'        => 'nullable|string|max:20|unique:students,cpf,' . $id,
            'gender'     => 'required|in:M,F',
            'phone'      => 'nullable|string|max:16',
            'birthday'   => 'nullable|date|before:today',
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

    public function attributes(): array
    {
        return [
            'name'       => 'nome',
            'email'      => 'e-mail',
            'rg'         => 'RG',
            'cpf'        => 'CPF',
            'gender'     => 'sexo',
            'phone'      => 'telefone',
            'birthday'   => 'data de nascimento',
            'birthplace' => 'naturalidade',
            //
            'gov_benefits'    => 'benefícios governamentais',
            'health_problems' => 'problemas de saúde',
            'note'            => 'observação',
            //
            'address_street'   => 'rua',
            'address_city'     => 'cidade',
            'address_state'    => 'estado',
            'address_zip_code' => 'CEP',
        ];
    }
}
