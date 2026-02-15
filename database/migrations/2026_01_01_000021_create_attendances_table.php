<?php

declare(strict_types=1);

use App\Enums\AttendanceStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('lesson_record_id')->constrained()->restrictOnDelete();
            $table->foreignId('enrollment_id')->constrained()->restrictOnDelete();

            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();

            $table->string('status', 50)->default(AttendanceStatus::DEFAULT);
            $table->text('justification')->nullable();

            $table->timestamps();

            $table->index(['enrollment_id', 'status']);
            $table->index('recorded_by');

            $table->unique(['lesson_record_id', 'enrollment_id'], 'unique_lesson_record_and_enrollment');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
