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
        $totalPresent = Attendance::where('clock_in', '<', Carbon::now()->setTime(9, 15, 0))->count();
        $totalLate = Attendance::where('clock_in', '>=', Carbon::now()->setTime(9, 15, 0))->count();
        $totalOnLeave = Leave::count();

        return response()->json([
            'totalEmployee' => $totalEmployee,
            'totalPresent' => $totalPresent,
            'totalLate' => $totalLate,
            'totalOnLeave' => $totalOnLeave,
        ]);
    }
}
