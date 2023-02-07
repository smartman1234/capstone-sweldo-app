<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminAttendanceController extends Controller
{

    public function index(Request $request)
    {
        if ($request->name == null) {
            $attendances = Attendance::paginate(10);
        } else {
            $attendances = Attendance::with('user')
                ->whereHas('user', function ($query) use ($request) {
                    $query->where('first_name', 'LIKE', "%" . $request->name . "%")
                        ->orWhere('last_name', 'LIKE', "%" . $request->name . "%");
                })
                ->paginate(10);
        }

        $employeesName = [];
        foreach ($attendances->items() as $item) {
            $employeesName[] = [
                'id' => $item->id,
                'name' => $item->user->first_name . ' ' . $item->user->last_name,
                'date' => $item->date,
                'clock_in' => $item->clock_in,
                'clock_out' => $item->clock_out,
                'total_hours' => Carbon::parse($item->clock_in)->diffInHours(Carbon::parse($item->clock_out)),
                'status' => $item->clock_in >= Carbon::now()->setTime(9, 15, 0) ? 'late' : 'present',
            ];
        }

        $attendances = $attendances->toArray();
        $attendances['data'] = $employeesName;
        return response()->json([
            'attendances' => $attendances,
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
