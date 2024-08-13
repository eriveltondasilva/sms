<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{
    SchoolYearController,
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
    UserController,
};

// ### ADMIN ROUTES ###
Route::middleware(['auth', 'role:admin'])
->prefix('/admin')->name('admin.')->group(function () {
    //* DASHBOARD ROUTES
    Route::get('/panel', [DashboardController::class, 'index'])->name('dashboard');


    //* CALENDAR
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');


    //* SCHOOL YEAR ROUTES
    Route::put('/school-years/{schoolYear}/update-status', [SchoolYearController::class, 'updateStatus'])
        ->name('school-years.update-status');

    Route::resource('school-years', SchoolYearController::class)->only([
        'index', 'create', 'store', 'show', 'edit', 'update', 'destroy'
    ])->parameters(['school-years' => 'schoolYear']);


    //* GROUP ROUTES
    Route::resource('groups', GroupController::class)->only([
        'index', 'create', 'store', 'show', 'edit', 'update', 'destroy'
    ]);


    //* GROUP/STUDENT ROUTES
    Route::resource('groups.students', GroupStudentController::class)->only([
       'index', 'create', 'store', 'destroy'
    ]);


    //* GROUP/TEACHER ROUTES
    Route::resource('groups.teachers', GroupTeacherController::class)->only([
        'index', 'create', 'store', 'destroy'
    ]);


    //* STUDENT ROUTES
    Route::resource('students', StudentController::class)->only([
        'index', 'create', 'store', 'show', 'edit', 'update', 'destroy'
    ]);


    //* SUBJECT ROUTES
    Route::resource('subjects', SubjectController::class)->only([
        'index',
    ]);


    //* SUBJECT/TEACHER ROUTES
    Route::resource('subjects.teachers', SubjectTeacherController::class)->only([
        'index', 'create', 'store', 'destroy'
    ]);


    //* TEACHER ROUTES
    Route::resource('teachers', TeacherController::class)->only([
        'index', 'create', 'store', 'show', 'edit', 'update', 'destroy'
    ]);


    //* TEACHER/USER ROUTES
    Route::resource('teachers.users', TeacherUserController::class)->only([
        'create', 'edit', 'store', 'update'
    ]);


    //* USER ROUTES
    Route::resource('users', UserController::class)->only([
        'index', 'create', 'store', 'show', 'edit', 'update', 'destroy'
    ]);

    // ds()->routes();
});
