<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Statistics
        $monthly = 0;
        $rate = 0;
        $leave = 0;
        $expectedSalary = 0;

        // Attendance
        $clockIn = null;
        $clockOut = null;

        // Get user
        $user = $request->user();

        // Get total hours (monthly)
        $monthlyAttendances = $user->attendances()->whereBetween(
            'created_at',
            [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth()
            ]
        )->get();
        foreach ($monthlyAttendances as $attendance) {
            $monthly += Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
        }

        // Get rate
        $rate = $user->job->salary;

        // Get total leaves
        $leave = $user->leaves()->count();

        // Expected salary
        $expectedSalary = $monthly * $rate;

        // Get attendance today
        $attendance = $user->attendances()->where('created_at', '>=', Carbon::now()->startOfDay())->first();
        if ($attendance != null) {
            $clockIn = $attendance->clock_in;
            $clockOut = $attendance->clock_out;
        }

        return response()->json([
            'monthly' => $monthly,
            'rate' => $rate,
            'leave' => $leave,
            'expectedSalary' => $expectedSalary,
            'clockIn' => $clockIn,
            'clockOut' => $clockOut,
        ]);
    }
}
