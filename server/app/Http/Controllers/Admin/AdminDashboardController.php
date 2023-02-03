<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use App\Models\User;
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

        // TODO: Return attendance overview data
        return response()->json([
            'totalEmployee' => $totalEmployee,
            'totalPresent' => $totalPresent,
            'totalLate' => $totalLate,
            'totalOnLeave' => $totalOnLeave,
        ]);
    }
}
