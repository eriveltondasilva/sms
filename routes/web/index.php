<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    DashboardController,
    ProfileController,
    SocialiteController,
    WelcomeController
};

//# WEB ROUTES
Route::get('/', WelcomeController::class)->name('welcome');

// TODO: rota para teste, remover depois
Route::get('/teste', fn () => 'Hello, World!')->name('test');

Route::get('/painel', DashboardController::class)
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->controller(ProfileController::class)
->prefix('/profile')->name('profile.')->group(function () {
    Route::get('/', 'edit')->name('edit');
    //* actions
    Route::patch('/', 'update')->name('update');
    Route::delete('/', 'destroy')->name('destroy');
});

Route::controller(SocialiteController::class)
->prefix('/socialite')->name('socialite.')->group(function () {
    Route::get('/redirect', 'redirect')->name('redirect');
    Route::get('/callback', 'callback')->name('callback');
});

//# EXTRA ROUTES
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/student.php';
require __DIR__.'/teacher.php';