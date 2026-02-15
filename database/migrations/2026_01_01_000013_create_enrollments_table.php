<?php

declare(strict_types=1);

use App\Enums\EnrollmentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('classroom_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_year_id')->constrained()->cascadeOnDelete();

            $table->string('status', 50)->default(EnrollmentStatus::DEFAULT);
            $table->string('final_result', 50)->nullable();

            $table->decimal('attendance_percentage', 5, 2)->nullable();
            $table->decimal('final_score', 5, 2)->nullable();

            $table->date('enrolled_at')->nullable();
            $table->date('finalized_at')->nullable();

            $table->text('transfer_reason')->nullable();
            $table->text('dropout_reason')->nullable();

            $table->timestamps();

            $table->index(['school_year_id', 'classroom_id', 'status']);
            $table->index(['student_id', 'school_year_id']);
            $table->index(['school_year_id', 'status']);
        });

        DB::statement(sprintf(
            "CREATE UNIQUE INDEX unique_active_student_per_year
            ON enrollments (student_id, school_year_id)
            WHERE status = '%s'",
            EnrollmentStatus::DEFAULT
        ));
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
