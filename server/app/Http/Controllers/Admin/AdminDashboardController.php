<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;
use DateTimeZone;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Return statistics
        $totalEmployee = User::where('is_admin', 0)->count();
        $totalPresent = 0;
        $totalLate = 0;
        $totalOnLeave = Leave::count();

        // Get the current time
        $today = Carbon::now(new DateTimeZone('Asia/Singapore'));

        // Loop through each employee's attendance record
        $employees = User::where('is_admin', 0)->get();
        foreach ($employees as $employee) {
            $attendance = Attendance::where('user_id', $employee->id)
                ->whereDate('created_at', $today)
                ->first();
            if ($attendance) {
                // Check if the employee clocked in before or after 9:15 AM
                $clockIn = Carbon::parse($attendance->clock_in);
                $threshold = Carbon::create($today->year, $today->month, $today->day, 9, 15, 0);
                if ($clockIn->lt($threshold)) {
                    $totalPresent++;
                } else {
                    $totalLate++;
                }
            }
        }
        // TODO: Return attendance overview data
        return response()->json([
            'totalEmployee' => $totalEmployee,
            'totalPresent' => $totalPresent,
            'totalLate' => $totalLate,
            'totalOnLeave' => $totalOnLeave,
        ]);
    }
}
