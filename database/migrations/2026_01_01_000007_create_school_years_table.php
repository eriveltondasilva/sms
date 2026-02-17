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

            $table->unique(['school_id', 'year'], 'unq_sy_year_per_school');
        });

        DB::statement(sprintf("
            CREATE UNIQUE INDEX unq_sy_in_progress 
            ON school_years (school_id) 
            WHERE status = '%s'
        ", SchoolYearStatus::IN_PROGRESS->value));
    }

    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS unq_sy_in_progress');
        Schema::dropIfExists('school_years');
    }
};
