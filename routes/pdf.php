<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function (): void {
    // Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
});
