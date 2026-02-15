<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('academic_histories', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('student_id')->constrained()->restrictOnDelete();
            $table->foreignId('school_year_id')->constrained()->restrictOnDelete();

            $table->decimal('final_score', 5, 2)->nullable();
            $table->string('final_status', 50);

            $table->text('observations')->nullable();

            $table->timestamps();

            $table->index(['student_id', 'final_status']);

            $table->unique(['student_id', 'school_year_id'], 'unique_student_and_school_year');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academic_histories');
    }
};
