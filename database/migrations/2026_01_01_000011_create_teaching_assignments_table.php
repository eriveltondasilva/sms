<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('teaching_assignments', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('classroom_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teacher_id')->nullable()->constrained()->nullOnDelete();

            $table->unsignedSmallInteger('workload_hours')->nullable();
            $table->unsignedSmallInteger('total_classes_given')->default(0);

            $table->date('start_date');
            $table->date('end_date')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index(['classroom_id', 'subject_id', 'is_active']);
            $table->index('teacher_id');

            $table->unique(['classroom_id', 'subject_id'], 'unique_class_and_subject');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teaching_assignments');
    }
};
