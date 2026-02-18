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

            $table->string('status', 50)->default(AcademicPeriodStatus::DEFAULT);

            $table->timestamps();

            $table->index(['school_year_id', 'start_date', 'end_date']);
            $table->index(['school_year_id', 'status']);

            $table->unique(['school_year_id', 'order'], 'unq_period_order_per_sy');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academic_periods');
    }
};
