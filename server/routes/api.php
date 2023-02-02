<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

// User
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\AttendanceController;
use App\Http\Controllers\User\TaskController;
use App\Http\Controllers\User\SettingsController;
use App\Http\Controllers\User\SalaryHistoryController;
use App\Http\Controllers\User\ProfileController;

// Admin
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\DeductionController;
use App\Http\Controllers\Admin\AdminLeaveController;
use App\Http\Controllers\Admin\PayrollController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminSettingsController;
use App\Http\Controllers\User\LeaveController;

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

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Attendance
    Route::post('/attendance/clock-in', [AttendanceController::class, 'clockIn']);
    Route::post('/attendance/clock-out', [AttendanceController::class, 'clockOut']);
    Route::get('/attendance/overview', [AttendanceController::class, 'getAttendanceOverview']);

    // Task
    Route::get('/task/monthly/{timestamp}', [TaskController::class, 'getMonthlyTasks']);
    Route::get('/task/daily/{timestamp}', [TaskController::class, 'getDailyTasks']);
    Route::post('/task', [TaskController::class, 'store']);
    Route::post('/task/{id}/delete', [TaskController::class, 'destroy']);

    // Leave
    Route::get('/leave', [LeaveController::class, 'index']);
    Route::post('/leave', [LeaveController::class, 'store']);

    // Salary history
    Route::get('/salary-history', [SalaryHistoryController::class, 'index']);

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

    // Deduction
    Route::get('/deduction', [DeductionController::class, 'index']);
    Route::post('/deduction', [DeductionController::class, 'store']);
    Route::get('/deduction/{id}', [DeductionController::class, 'show']);
    Route::post('/deduction/{id}', [DeductionController::class, 'update']);

    // Leave
    Route::get('/leave', [AdminLeaveController::class, 'index']);
    Route::post('/leave/{id}/approve', [AdminLeaveController::class, 'approve']);
    Route::post('/leave/{id}/decline', [AdminLeaveController::class, 'decline']);

    // Payroll
    Route::get('/payroll', [PayrollController::class, 'index']);

    // Profile
    Route::get('/profile', [AdminProfileController::class, 'show']);
    Route::post('/profile', [AdminProfileController::class, 'update']);

    // Settings
    Route::post('/settings', [AdminSettingsController::class, 'update']);
});
