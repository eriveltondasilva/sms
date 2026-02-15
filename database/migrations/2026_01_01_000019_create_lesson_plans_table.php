<?php

declare(strict_types=1);

use App\Enums\LessonPlanStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_plans', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('classroom_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->date('week_start_date');
            $table->date('week_end_date');

            $table->text('content')->nullable();
            $table->text('objectives')->nullable();
            $table->text('methodology')->nullable();
            $table->text('resources')->nullable();
            $table->text('notes')->nullable();

            $table->string('status', 50)->default(LessonPlanStatus::DEFAULT);
            $table->json('bncc_codes')->nullable();

            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->index(['classroom_id', 'status']);
            $table->index(['week_start_date', 'week_end_date']);
            $table->index('created_by');

            $table->unique(['classroom_id', 'subject_id', 'week_start_date'], 'unique_lesson_plan_per_classroom');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_plans');
    }
};
