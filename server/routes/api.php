<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Admin\AdminDashboardController;
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
});