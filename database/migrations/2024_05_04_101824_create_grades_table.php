<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->decimal('value', 4, 2)->comment('Valor da nota');
            //
            $table->unsignedBigInteger('quarter_id')->comment('ID do trimestre');
            $table->unsignedBigInteger('student_id')->comment('ID do aluno');
            $table->unsignedBigInteger('subject_id')->comment('ID da disciplina');
            $table->unsignedBigInteger('teacher_id')->comment('ID do professor');
            //
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
