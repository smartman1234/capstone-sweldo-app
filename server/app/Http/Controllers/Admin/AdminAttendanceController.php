<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminAttendanceController extends Controller
{

    public function index()
    {

        $attendances = Attendance::orderBy('clock_in', 'desc')->take(10)->get();

        $employeesName = [];
        foreach ($attendances as $attendance) {
            $employeesName[] = [
                'id' => $attendance->id,
                'name' => $attendance->user->first_name . ' ' . $attendance->user->last_name,
                'clock_in' => $attendance->clock_in,
                'status' => $attendance->clock_in >= Carbon::now()->setTime(9, 15, 0) ? 'late' : 'present',
            ];
        }

        return response()->json([
            'attendance' => $employeesName,
        ]);
    }

    public function getRecentAttendance()
    {

        $attendances = Attendance::orderBy('clock_in', 'desc')->take(10)->get();

        $employeesName = [];
        foreach ($attendances as $attendance) {
            $employeesName[] = [
                'id' => $attendance->id,
                'name' => $attendance->user->first_name . ' ' . $attendance->user->last_name,
                'clock_in' => $attendance->clock_in,
                'status' => $attendance->clock_in >= Carbon::now()->setTime(9, 15, 0) ? 'late' : 'present',
            ];
        }

        return response()->json([
            'attendance' => $employeesName,
        ]);
    }
}
