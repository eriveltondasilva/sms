<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nome do professor');
            $table->enum('gender', ['F', 'M'])->nullable()->default('M')->comment('Gênero do professor');
            $table->string('rg')->unique()->nullable()->comment('RG do professor');
            $table->string('cpf')->unique()->nullable()->comment('CPF do professor');
            $table->date('birthday')->nullable()->comment('Data de nascimento do professor');
            $table->string('email')->nullable()->comment('E-mail do professor');
            $table->string('phone')->nullable()->comment('Telefone do professor');
            // TODO: remove teacher address fields
            $table->string('address_street')->nullable()->comment('Endereço do professor');
            $table->string('address_city')->nullable()->comment('Cidade do professor');
            $table->string('address_state')->nullable()->comment('Estado do professor');
            $table->string('address_zip_code')->nullable()->comment('CEP do professor');
            //
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
