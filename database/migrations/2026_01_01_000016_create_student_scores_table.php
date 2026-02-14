<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('student_scores', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('assessment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('enrollment_id')->constrained()->cascadeOnDelete();

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->decimal('score', 6, 2)->nullable();

            $table->timestamps();

            $table->index('assessment_id');
            $table->index('created_by');

            $table->unique(['enrollment_id', 'assessment_id'], 'unique_enrollment_and_assessment');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_scores');
    }
};
