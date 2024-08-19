<?php

use App\Http\Controllers\Student\DashboardController;
use Illuminate\Support\Facades\Route;

//# STUDENT ROUTES
Route::middleware(['auth', 'role:student'])
->prefix('/student')->name('student.')->group(function () {
    //* DASHBOARD ROUTES
    Route::get('/painel', [DashboardController::class, 'index'])->name('dashboard');

    //* CALENDAR ROUTES
    Route::get('/calendar', fn () => inertia('Calendar'))->name('calendar');
});
