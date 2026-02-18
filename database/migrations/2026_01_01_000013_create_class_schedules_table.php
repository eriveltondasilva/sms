<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('class_schedules', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('classroom_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teacher_id')->nullable()->constrained()->nullOnDelete();

            $table->unsignedTinyInteger('weekday'); // 1..7
            $table->unsignedTinyInteger('lesson_order'); // ordinal

            $table->date('start_date');
            $table->date('end_date')->nullable();

            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index(['subject_id', 'weekday']);
            $table->index(['classroom_id', 'weekday']);
            $table->index(['teacher_id']);

            $table->unique(['classroom_id', 'subject_id', 'weekday', 'lesson_order', 'start_date'], 'class_schedule_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('class_schedules');
    }
};
