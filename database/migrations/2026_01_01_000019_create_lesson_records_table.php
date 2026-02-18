<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_records', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('teaching_assignment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();

            $table->date('lesson_date');
            $table->unsignedTinyInteger('lessons_given')->default(1);

            $table->timestamp('recorded_at')->nullable();
            $table->timestamps();

            $table->index('lesson_date');
            $table->index('recorded_by');

            $table->unique(['teaching_assignment_id', 'lesson_date'], 'unique_teaching_assignment_and_lesson_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_records');
    }
};
