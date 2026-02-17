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

            $table->unsignedSmallInteger('total_school_days')->default(200);
            $table->unsignedSmallInteger('total_school_hours')->default(800);

            $table->timestamps();

            $table->index(['school_id', 'year']);
            $table->index(['school_id', 'status']);

            $table->unique(['school_id', 'year'], 'unique_year_per_school');
        });

        DB::statement(sprintf("
            CREATE UNIQUE INDEX unique_in_progress_school_year 
            ON school_years (school_id) 
            WHERE status = '%s'
        ", SchoolYearStatus::IN_PROGRESS->value));
    }

    public function down(): void
    {
        Schema::dropIfExists('school_years');
    }
};
