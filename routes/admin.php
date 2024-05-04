<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{
    AcademicYearController,
    CalendarController,
    DashboardController,
    GroupController,
    GroupStudentController,
    GroupTeacherController,
    StudentController,
    SubjectController,
    SubjectTeacherController,
    TeacherController,
    TeacherUserController,
};

// ### ADMIN ROUTES ###
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    //* DASHBOARD ROUTES
    Route::get('/painel', DashboardController::class)->name('dashboard');

    //* CALENDAR
    Route::get('/calendario', CalendarController::class)->name('calendar');

    //* ACADEMIC YEAR ROUTES
    Route::controller(AcademicYearController::class)
    ->prefix('anos-letivos')->name('academic-years.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/cadastrar', 'create')->name('create');
        Route::get('/{academicYear}/editar', 'edit')->name('edit');
        //* ACTIONS
        Route::post('/', 'store')->name('store');
        Route::put('/{academicYear}', 'update')->name('update');
        Route::put('/{academicYear}/atualizar-status', 'updateStatus')->name('update-status');
    });

    //* GROUP ROUTES
    Route::controller(GroupController::class)
    ->prefix('turmas')->name('groups.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/cadastrar', 'create')->name('create');
        Route::get('/{group}/editar', 'edit')->name('edit');
        //* ACTIONS
        Route::post('/', 'store')->name('store');
        Route::put('/{group}', 'update')->name('update');
    });

    //* GROUP/STUDENT ROUTES
    Route::controller(GroupStudentController::class)
    ->prefix('turmas/{group}/alunos')->name('groups.students.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/adicionar', 'create')->name('create');
        //* ACTIONS
        Route::post('/{student}', 'store')->name('store');
        Route::delete('/{student}', 'destroy')->name('destroy');
    });

    //* GROUP/TEACHER ROUTES
    Route::controller(GroupTeacherController::class)
    ->prefix('turmas/{group}/professores')->name('groups.teachers.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/adicionar', 'create')->name('create');
        //* ACTIONS
        Route::post('/{teacher}', 'store')->name('store');
        Route::delete('/{teacher}', 'destroy')->name('destroy');
    });

    //* STUDENT ROUTES
    Route::controller(StudentController::class)
    ->prefix('alunos')->name('students.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/cadastrar', 'create')->name('create');
        Route::get('/{student}', 'show')->name('show');
        Route::get('/{student}/editar', 'edit')->name('edit');
        //* ACTIONS
        Route::post('/', 'store')->name('store');
        Route::put('/{student}', 'update')->name('update');
    });

    //* SUBJECT ROUTES
    Route::controller(SubjectController::class)
    ->prefix('disciplinas')->name('subjects.')->group(function () {
        Route::get('/', 'index')->name('index');
    });

    //* SUBJECT/TEACHER ROUTES
    Route::controller(SubjectTeacherController::class)
    ->prefix('disciplinas/{subject}/professores')->name('subjects.teachers.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/adicionar', 'create')->name('create');
        //* ACTIONS
        Route::post('/{teacher}', 'store')->name('store');
        Route::delete('/{teacher}', 'destroy')->name('destroy');
    });

    //* TEACHER ROUTES
    Route::controller(TeacherController::class)
    ->prefix('professores')->name('teachers.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/cadastrar', 'create')->name('create');
        Route::get('/{teacher}', 'show')->name('show');
        Route::get('/{teacher}/editar', 'edit')->name('edit');
        //* ACTIONS
        Route::post('/', 'store')->name('store');
        Route::put('/{teacher}', 'update')->name('update');
    });

    //* TEACHER/USER ROUTES
    Route::controller(TeacherUserController::class)
    ->prefix('professores/{teacher}/usuarios')->name('teachers.users.')->group(function () {
        Route::get('/adicionar', 'create')->name('create');
        Route::get('/{user}', 'show')->name('show');
        Route::get('/{user}/editar', 'edit')->name('edit');
        //* ACTIONS
        Route::post('/', 'store')->name('store');
        Route::put('/{user}', 'update')->name('update');
        Route::delete('/{user}', 'destroy')->name('destroy');
    });
});
