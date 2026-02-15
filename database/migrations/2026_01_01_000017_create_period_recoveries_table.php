<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('period_recoveries', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('enrollment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teaching_assignment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('academic_period_id')->constrained()->cascadeOnDelete();

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->decimal('original_score', 5, 2)->nullable();
            $table->decimal('recovery_score', 5, 2);

            $table->timestamps();

            $table->index('teaching_assignment_id');

            $table->unique(['enrollment_id', 'teaching_assignment_id', 'academic_period_id'], 'period_recovery_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('period_recoveries');
    }
};
