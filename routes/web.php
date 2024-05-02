<?php

use App\Http\Controllers\{
    DashboardController,
    ProfileController,
    SocialiteController,
    WelcomeController
};
use Illuminate\Support\Facades\Route;

// ### ROUTES ###

Route::get('/', WelcomeController::class)->name('welcome');


// TODO: rota para teste, remover depois
Route::get('/teste', fn () => 'Hello, World!')->name('test');


Route::get('/painel', DashboardController::class)
->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->controller(ProfileController::class)
->name('profile.')->prefix('/perfil')->group(function () {
    Route::get('/', 'edit')->name('edit');
    //* actions
    Route::patch('/', 'update')->name('update');
    Route::delete('/', 'destroy')->name('destroy');
});


Route::controller(SocialiteController::class)
->name('socialite.')->prefix('/socialite')->group(function () {
    Route::get('/redirect', 'redirect')->name('redirect');
    Route::get('/callback', 'callback')->name('callback');
});

// ### OTHER ###

require __DIR__.'/auth.php';
