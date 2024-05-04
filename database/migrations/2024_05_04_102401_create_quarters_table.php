<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('quarters', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nome do trimestre');
            $table->date('start_date')->nullable()->comment('Data de início do trimestre');
            $table->date('end_date')->nullable()->comment('Data de término do trimestre');
            //
            $table->unsignedBigInteger('academic_year_id')->comment('ID do ano acadêmico');
            //
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quarters');
    }
};
