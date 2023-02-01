<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

// User
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\SettingsController;

// Admin
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\LeaveController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminSettingsController;

Route::post('/login', [LoginController::class, 'login']);

/*
    User routes
*/

Route::group([
    'prefix' => '/user',
    'middleware' => [
        'auth:api',
    ]
], function () {

    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);

    // Settings
    Route::post('/settings', [SettingsController::class, 'update']);
});

/*
    Admin routes
*/

Route::group([
    'prefix' => '/admin',
    'middleware' => [
        'auth:api',
        'admin'
    ]
], function () {

    // Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);

    // Employee
    Route::get('/employee', [EmployeeController::class, 'index']);
    Route::post('/employee', [EmployeeController::class, 'store']);
    Route::get('/employee/{id}', [EmployeeController::class, 'show']);
    Route::post('/employee/{id}', [EmployeeController::class, 'update']);

    // Department
    Route::get('/department', [DepartmentController::class, 'index']);
    Route::post('/department', [DepartmentController::class, 'store']);
    Route::get('/department/{id}', [DepartmentController::class, 'show']);
    Route::post('/department/{id}', [DepartmentController::class, 'update']);

    // Job
    Route::get('/job', [JobController::class, 'index']);
    Route::post('/job', [JobController::class, 'store']);
    Route::get('/job/{id}', [JobController::class, 'show']);
    Route::post('/job/{id}', [JobController::class, 'update']);

    // Leave
    Route::get('/leave', [LeaveController::class, 'index']);
    Route::post('/leave/{id}/approve', [LeaveController::class, 'approve']);
    Route::post('/leave/{id}/decline', [LeaveController::class, 'decline']);

    // Profile
    Route::get('/profile', [AdminProfileController::class, 'show']);
    Route::post('/profile', [AdminProfileController::class, 'update']);

    // Settings
    Route::post('/settings', [AdminSettingsController::class, 'update']);
});
