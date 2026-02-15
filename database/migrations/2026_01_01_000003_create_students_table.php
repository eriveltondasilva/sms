<?php

declare(strict_types=1);

use App\Enums\Gender;
use App\Enums\StudentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('school_id')->constrained()->cascadeOnDelete();

            $table->string('full_name');
            $table->string('social_name')->nullable();

            $table->string('registration', 20);
            $table->uuid('public_id')->unique();

            $table->char('gender', 1)->default(Gender::DEFAULT);
            $table->date('birth_date')->nullable();
            $table->string('birth_place')->nullable();

            $table->string('rg', 20)->nullable();
            $table->string('cpf', 11);

            $table->string('phone', 15)->nullable();
            $table->string('email')->nullable();

            $table->text('address')->nullable();

            $table->string('sus_card', 20)->nullable();
            $table->string('blood_type', 3)->nullable();

            $table->text('health_conditions')->nullable();
            $table->text('allergies')->nullable();

            $table->string('status', 50)->default(StudentStatus::DEFAULT);
            $table->text('status_notes')->nullable();

            $table->timestamps();

            $table->index('cpf');
            $table->index('public_id');
            $table->index(['school_id', 'full_name']);
            $table->index(['school_id', 'status']);

            $table->unique(['school_id', 'registration'], 'unique_registration_per_school');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
