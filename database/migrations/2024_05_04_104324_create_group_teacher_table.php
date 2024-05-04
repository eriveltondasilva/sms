<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('group_teacher', function (Blueprint $table) {
            $table->id();
            //
            $table->unsignedBigInteger('group_id')->comment('ID do grupo');
            $table->unsignedBigInteger('teacher_id')->comment('ID do professor');
            //
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('group_teacher');
    }
};
