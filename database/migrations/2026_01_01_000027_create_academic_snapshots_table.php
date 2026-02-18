<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// todo: implementar depois
return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('academic_snapshots', function (Blueprint $table): void {
            $table->id();
            // Chaves Estrangeiras para filtragem rápida e multi-tenancy
            $table->foreignId('school_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_year_id')->constrained()->cascadeOnDelete();
            $table->foreignId('enrollment_id')->unique()->constrained()->cascadeOnDelete();

            // Campos de busca/exibição desnormalizados para evitar JOINS na listagem
            $table->string('student_name')->index();
            $table->string('classroom_name');

            /**
             * O campo 'data' armazenará o JSON com:
             * - Médias por bimestre
             * - Faltas acumuladas
             * - Situação final por disciplina
             * - Status global (aprovado/reprovado/recuperação)
             */
            $table->jsonb('data');

            // Metadados de controle
            $table->boolean('is_outdated')->default(false)
                ->comment('Indica se o snapshot precisa ser recalculado após mudança de nota');

            $table->timestamp('generated_at')->nullable()
                ->comment('Data e hora da última consolidação');

            $table->timestamps();

            // Índices para performance
            $table->index(['school_id', 'school_year_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_snapshots');
    }
};
