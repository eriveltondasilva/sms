<?php

use App\Http\Controllers\{
    DashboardController,
    ProfileController,
    SocialiteController,
    WelcomeController
};
use Illuminate\Support\Facades\Route;

// ### WEB ROUTES ###
Route::get('/', WelcomeController::class)->name('welcome');


// TODO: rota para teste, remover depois
Route::get('/teste', fn () => 'Hello, World!')->name('test');


Route::get('/painel', DashboardController::class)
->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->controller(ProfileController::class)
->prefix('/perfil')->name('profile.')->group(function () {
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

// ### OTHER ###

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/student.php';
require __DIR__.'/teacher.php';
