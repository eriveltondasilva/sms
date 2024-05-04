<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Teacher\{
    DashboardController,
    CalendarController,
    GroupController
};

// ### TEACHER ROUTES ###
Route::middleware(['auth', 'role:teacher'])->prefix('professor')->name('teacher.')->group(function () {
    //* DASHBOARD ROUTES
    Route::get('painel', DashboardController::class)->name('dashboard');

    //* CALENDAR ROUTES
    Route::get('calendario', CalendarController::class)->name('calendar');

    //* GROUP ROUTES
    Route::controller(GroupController::class)->prefix('turmas')->name('groups.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/cadastrar', 'create')->name('create');
        Route::get('/{group}/editar', 'edit')->name('edit');
        //* ACTIONS
        Route::post('/', 'store')->name('store');
        Route::put('/{group}', 'update')->name('update');
    });

    //* TEACHER ROUTES

});
