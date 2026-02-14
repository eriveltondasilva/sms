<?php

declare(strict_types=1);

use App\Enums\AcademicPeriodStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('academic_periods', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('school_year_id')->constrained()->cascadeOnDelete();

            $table->string('name');
            $table->unsignedTinyInteger('order');

            $table->date('start_date');
            $table->date('end_date');

            $table->decimal('min_passing_score', 5, 2)->default(6.00);

            $table->string('status', 20)->default(AcademicPeriodStatus::DEFAULT);

            $table->timestamps();

            $table->index(['school_year_id', 'start_date', 'end_date']);
            $table->index(['school_year_id', 'status']);

            $table->unique(['school_year_id', 'order'], 'unique_order_per_school_year');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academic_periods');
    }
};
