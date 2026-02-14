<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('enrollment_subject_summaries', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('enrollment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teaching_assignment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('academic_period_id')->nullable()->constrained()->nullOnDelete();

            $table->unsignedSmallInteger('total_classes')->default(0);
            $table->unsignedSmallInteger('classes_attended')->default(0);

            $table->decimal('attendance_percentage', 5, 2)->nullable();
            $table->decimal('period_average', 6, 2)->nullable();

            $table->boolean('needs_recovery')->default(false);

            $table->timestamps();

            $table->index(['enrollment_id', 'academic_period_id']);
            $table->index('teaching_assignment_id');

            $table->unique(['enrollment_id', 'teaching_assignment_id', 'academic_period_id'], 'enrollment_subject_summary_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollment_subject_summaries');
    }
};
