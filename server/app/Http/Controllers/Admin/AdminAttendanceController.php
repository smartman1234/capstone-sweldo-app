<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminAttendanceController extends Controller
{

    public function index(Request $request)
    {
        if ($request->name == null) {
            $employees = User::paginate(10);
        } else {
            $employees = User::with('department')
                ->with('job')
                ->where('is_admin', 0)
                ->where('first_name', 'LIKE', "%" . $request->name . "%")
                ->orWhere('last_name', 'LIKE', "%" . $request->name . "%")
                ->orWhere('email', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }

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
            'employees' => $employees,
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
