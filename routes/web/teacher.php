<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Teacher\{
    CalendarController,
    DashboardController,
    GradeController,
    GroupController,
};

// ### TEACHER ROUTES ###
Route::middleware(['auth', 'role:teacher'])
->prefix('/professor')->name('teacher.')->group(function () {
    //* DASHBOARD ROUTES
    Route::get('/painel', DashboardController::class)->name('dashboard');

    //* CALENDAR ROUTES
    Route::get('/calendario', CalendarController::class)->name('calendar');

    //* GROUP ROUTES
    Route::controller(GroupController::class)
    ->prefix('/turmas')->name('groups.')->group(function () {
        Route::get('/', 'index')->name('index');
    });

    // * GRADE ROUTES
    Route::controller(GradeController::class)
    ->prefix('/notas')->name('grades.')->group(function () {
        Route::get('/', 'index')->name('index');
    });

    //* TEACHER ROUTES

});
