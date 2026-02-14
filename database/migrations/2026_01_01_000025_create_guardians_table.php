<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('guardians', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('student_id')->constrained()->cascadeOnDelete();

            $table->string('name');
            $table->string('relationship', 50);

            $table->string('phone', 15);
            $table->string('email')->nullable();
            $table->string('cpf', 11)->nullable();

            $table->text('address')->nullable();

            $table->boolean('is_primary')->default(false);

            $table->timestamps();

            $table->index(['student_id', 'is_primary']);
            $table->index('student_id');
            $table->index('cpf');

            $table->unique(['student_id', 'cpf'], 'student_guardian_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guardians');
    }
};
