<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $totalEmployee = User::where('is_admin', 0)->count();
        $totalPresent = Attendance::where('clock_in', '<', Carbon::now()->setTime(9, 15, 0))
            ->whereBetween(
                'clock_in',
                [
                    Carbon::now()->startOfDay(),
                    Carbon::now()->endOfDay()
                ]
            )->count();
        $totalLate = Attendance::where('clock_in', '>=', Carbon::now()->setTime(9, 15, 0))
            ->whereBetween(
                'clock_in',
                [
                    Carbon::now()->startOfDay(),
                    Carbon::now()->endOfDay()
                ]
            )->count();
        $totalOnLeave = Leave::where('status', 'approved')->count();

        return response()->json([
            'totalEmployee' => $totalEmployee,
            'totalPresent' => $totalPresent,
            'totalLate' => $totalLate,
            'totalOnLeave' => $totalOnLeave,
        ]);
    }
}
