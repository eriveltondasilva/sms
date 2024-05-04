<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nome do turma');
            $table->string('classroom')->nullable()->comment('Sala de aula');
            $table->string('shift')->nullable()->comment('Turno');
            //
            $table->unsignedBigInteger('academic_year_id')->comment('ID do ano escolar');
            //
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
