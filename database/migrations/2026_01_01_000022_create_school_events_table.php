<?php

declare(strict_types=1);

use App\Enums\SchoolEventType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('school_events', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('school_year_id')->constrained()->cascadeOnDelete();
            $table->foreignId('classroom_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('subject_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location')->nullable();

            $table->date('start_date');
            $table->date('end_date')->nullable();

            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            $table->string('type', 50)->default(SchoolEventType::DEFAULT);

            $table->boolean('blocks_lessons')->default(true);
            $table->boolean('affects_attendance')->default(true);

            $table->timestamps();

            $table->index(['school_year_id', 'type', 'start_date']);
            $table->index(['school_year_id', 'start_date']);
            $table->index(['classroom_id', 'start_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_events');
    }
};
