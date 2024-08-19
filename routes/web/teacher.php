<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Teacher\{
    CalendarController,
    DashboardController,
    GradeController,
    GroupController,
};

//# TEACHER ROUTES
Route::middleware(['auth', 'role:teacher'])
->prefix('/teacher')->name('teacher.')->group(function () {
    //* DASHBOARD ROUTES
    Route::get('/panel', [DashboardController::class, 'index'])->name('dashboard');

    //* CALENDAR ROUTES
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');

    //* GROUP ROUTES
    Route::resource('groups', GroupController::class)->only(['index']);


    // * GRADE ROUTES
    Route::resource('grades', GradeController::class)->only(['index']);

    //* TEACHER ROUTES

});
