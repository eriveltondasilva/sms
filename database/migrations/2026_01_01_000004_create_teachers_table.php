<?php

declare(strict_types=1);

use App\Enums\Gender;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('school_id')->constrained()->cascadeOnDelete();

            $table->string('name');
            $table->char('gender', 1)->default(Gender::DEFAULT);
            $table->date('birth_date')->nullable();

            $table->string('phone', 15)->nullable();
            $table->string('email')->nullable();

            $table->text('address')->nullable();

            $table->string('cpf', 11)->unique();
            $table->string('rg', 20)->nullable();

            $table->string('qualification')->nullable();
            $table->date('hire_date')->nullable();

            $table->json('bank_data')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index('cpf');
            $table->index(['school_id', 'name']);
            $table->index(['school_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
