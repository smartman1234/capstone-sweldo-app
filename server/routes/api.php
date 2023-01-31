<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Admin\AdminDashboardController;

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


});