<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Deduction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get statistics for user dashboard
     */
    public function index(Request $request)
    {
        $monthly = 0;
        $rate = 0;
        $leave = 0;
        $expectedSalary = 0;
        $clockIn = null;
        $clockOut = null;
        $user = $request->user();
        $monthlyAttendances = $user->attendances()->whereBetween(
            'clock_in',
            [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth()
            ]
        )->get();
        foreach ($monthlyAttendances as $attendance) {
            $monthly += Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
        }
        $rate = $user->job->salary;
        $leave = $user->leaves()->count();
        $deductions = Deduction::sum('amount');
        $expectedSalary = ($monthly * $rate) - $deductions;
        $attendance = $user->attendances()->where('clock_in', '>=', Carbon::now()->startOfDay())->first();
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
