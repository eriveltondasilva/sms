<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('classrooms', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('school_year_id')->constrained()->cascadeOnDelete();
            $table->foreignId('offered_grade_level_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('main_teacher_id')->nullable()->constrained('teachers')->nullOnDelete();

            $table->string('name', 50);
            $table->string('room')->nullable();
            $table->string('shift', 50)->nullable();

            $table->unsignedTinyInteger('student_max')->default(30);

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index(['school_year_id', 'name']);
            $table->index(['school_year_id', 'is_active']);
            $table->index(['offered_grade_level_id', 'is_active']);

            $table->unique(['school_year_id', 'offered_grade_level_id', 'name'], 'unique_classroom_per_school_year_and_grade_level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classrooms');
    }
};
