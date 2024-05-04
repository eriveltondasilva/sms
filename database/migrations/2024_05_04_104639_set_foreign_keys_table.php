<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('grades', function (Blueprint $table) {
            $table->foreign('quarter_id')->references('id')->on('quarters')->constrained();
            $table->foreign('student_id')->references('id')->on('students')->constrained();
            $table->foreign('subject_id')->references('id')->on('subjects')->constrained();
            $table->foreign('teacher_id')->references('id')->on('teachers')->constrained();
        });

        Schema::table('quarters', function (Blueprint $table) {
            $table->foreign('academic_year_id')->references('id')->on('academic_years')->constrained();
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->foreign('academic_year_id')->references('id')->on('academic_years')->constrained();
        });

        //

        Schema::table('group_student', function (Blueprint $table) {
            $table->foreign('group_id')->references('id')->on('groups')->constrained();
            $table->foreign('student_id')->references('id')->on('students')->constrained();
        });

        Schema::table('group_teacher', function (Blueprint $table) {
            $table->foreign('group_id')->references('id')->on('groups')->constrained();
            $table->foreign('teacher_id')->references('id')->on('teachers')->constrained();
        });

        Schema::table('subject_teacher', function (Blueprint $table) {
            $table->foreign('subject_id')->references('id')->on('subjects')->constrained();
            $table->foreign('teacher_id')->references('id')->on('teachers')->constrained();
            $table->foreign('academic_year_id')->references('id')->on('academic_years')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
