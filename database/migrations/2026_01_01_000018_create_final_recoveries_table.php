<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('final_recoveries', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('enrollment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teaching_assignment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->decimal('year_total_score', 5, 2)->nullable();
            $table->decimal('final_exam_score', 5, 2)->nullable();
            $table->decimal('final_score', 5, 2)->nullable();

            $table->timestamps();

            $table->index('teaching_assignment_id');

            $table->unique(['enrollment_id', 'teaching_assignment_id'], 'final_recovery_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('final_recoveries');
    }
};
