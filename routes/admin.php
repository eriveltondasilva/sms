<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\ImpersonationController;
use App\Http\Controllers\Admin\SchoolController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:super_admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {

        // Schools
        Route::resource('schools', SchoolController::class)
            ->except(['create', 'edit']);

        Route::post('schools/{school}/toggle-active', [SchoolController::class, 'toggleActive'])
            ->name('schools.toggle-active');

        // Impersonation
        Route::post('schools/{school}/impersonate', [ImpersonationController::class, 'start'])
            ->name('impersonate.start');

        Route::delete('impersonate', [ImpersonationController::class, 'stop'])
            ->name('impersonate.stop');

        // Super-admin users
        Route::resource('users', UserController::class)
            ->except(['create', 'edit', 'show']);
    });
