<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\EmployeeController;

Route::post('/login', [LoginController::class, 'login']);

/*
    User routes
*/

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
});