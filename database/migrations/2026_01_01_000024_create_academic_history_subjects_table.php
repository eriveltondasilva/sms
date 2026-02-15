<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('academic_history_subjects', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('academic_history_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->restrictOnDelete();

            $table->unsignedSmallInteger('workload_hours')->nullable();
            $table->string('result', 50)->nullable(); // approved | failed

            $table->decimal('final_score', 5, 2)->nullable();
            $table->decimal('attendance_percentage', 5, 2)->nullable();

            $table->timestamps();

            $table->unique(['academic_history_id', 'subject_id'], 'unique_academic_history_and_subject');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academic_history_subjects');
    }
};
