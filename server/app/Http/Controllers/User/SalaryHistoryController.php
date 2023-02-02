<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SalaryHistoryController extends Controller
{
    public function index(Request $request)
    {
        // Get user
        $user = $request->user();

        // Get all attendance
        $attendances = $user->attendances()->get();

        // Get total hours and rate
        $salaryHistory = [];
        foreach ($attendances as $attendance) {
            $month = Carbon::parse($attendance->created_at)->format('M Y');
            if (!isset($salaryHistory[$month])) {
                $salaryHistory[$month] = [
                    'date' => $month,
                    'totalHours' => 0,
                    'rate' => $user->job->salary,
                ];
            }
            $salaryHistory[$month]['totalHours'] += Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
        }

        $final = [];
        foreach ($salaryHistory as $salary) {
            $final[] = $salary;
        }

        return response()->json([
            'salaryHistory' => $final
        ]);
    }
}
