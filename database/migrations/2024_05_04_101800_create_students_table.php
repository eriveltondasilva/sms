<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nome do aluno');
            $table->enum('gender', ['F', 'M'])->nullable()->default('M')->comment('Gênero do aluno');
            $table->string('email')->nullable()->comment('E-mail do aluno');
            $table->string('rg')->nullable()->comment('RG do aluno');
            $table->string('cpf')->nullable()->comment('CPF do aluno');
            $table->date('birthday')->nullable()->comment('Data de nascimento do aluno');
            $table->string('birthplace')->nullable()->comment('Local de nascimento do aluno');
            $table->string('phone')->nullable()->comment('Telefone do aluno');
            // #TODO: remove student address fields
            $table->string('address_street')->nullable()->comment('Endereço do aluno');
            $table->string('address_city')->nullable()->comment('Cidade do aluno');
            $table->string('address_state')->nullable()->comment('Estado do aluno');
            $table->string('address_zip_code')->nullable()->comment('CEP do aluno');
            //
            $table->string('gov_benefits')->nullable()->comment('Benefícios governamentais do aluno');
            $table->string('health_problems')->nullable()->comment('Problemas de saúde do aluno');
            $table->text('note')->nullable()->comment('Observações sobre o aluno');
            //
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
