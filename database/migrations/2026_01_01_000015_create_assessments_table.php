<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('teaching_assignment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('academic_period_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('assessment_type_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->string('name');
            $table->string('description')->nullable();

            $table->decimal('max_score', 6, 2)->default(10.00);
            $table->decimal('weight', 6, 2)->default(1.00);

            $table->string('recovery_type', 50)->nullable();
            $table->date('date')->nullable();

            $table->timestamps();

            $table->index(['academic_period_id', 'date']);
            $table->index(['teaching_assignment_id', 'academic_period_id']);
            $table->index('teaching_assignment_id');
            $table->index('created_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
