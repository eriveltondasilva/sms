<?php

declare(strict_types=1);

use App\Enums\SchoolYearStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('school_years', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('school_id')->constrained()->cascadeOnDelete();

            $table->year('year');
            $table->string('status', 50)->default(SchoolYearStatus::DEFAULT);

            $table->decimal('min_passing_score', 5, 2)->default(24.00);
            $table->decimal('min_attendance_percentage', 5, 2)->default(75.00);

            $table->unsignedSmallInteger('total_school_days')->default(200);
            $table->unsignedSmallInteger('total_school_hours')->default(800);

            $table->boolean('is_current')->default(false);

            $table->timestamps();

            $table->index(['school_id', 'year']);
            $table->index(['school_id', 'status']);
            $table->index(['school_id', 'is_current']);

            $table->unique(['school_id', 'year'], 'unique_year_per_school');
        });

        DB::statement('
            CREATE UNIQUE INDEX unique_current_school_year_per_school 
            ON school_years (school_id) 
            WHERE is_current = true
        ');
    }

    public function down(): void
    {
        Schema::dropIfExists('school_years');
    }
};
