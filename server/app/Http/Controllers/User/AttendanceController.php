<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use DateTimeZone;

class AttendanceController extends Controller
{
    public function index(Request $request){
        // Get user
        $user = $request->user();

        // Get attendance
        $attendances = $user->attendances()->paginate(10);

        // Modify data
        $employeesName = [];
        foreach ($attendances->items() as $item) {
            $employeesName[] = [
                'id' => $item->id,
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
            'attendances' => $attendances
        ]);
    }
    
    public function clockIn(Request $request)
    {
        // Get user
        $user = $request->user();

        // Get attendance today
        $attendance = $user->attendances()->where('clock_in', '>=', Carbon::now()->startOfDay())->first();
        if ($attendance != null) {
            return response()->json([
                'message' => 'You have already clocked in today'
            ], 400);
        }

        // Create new attendance 
        $user->attendances()->create([
            'clock_in' => Carbon::now(new DateTimeZone('Asia/Singapore'))
        ]);

        return response()->json([
            'message' => 'You have clocked in successfully'
        ]);
    }

    public function clockOut(Request $request)
    {
        // Get user
        $user = $request->user();

        // Get attendance today
        $attendance = $user->attendances()->where('clock_in', '>=', Carbon::now()->startOfDay())->first();
        if ($attendance != null && $attendance->clock_out !== null) {
            return response()->json([
                'message' => 'You have already clocked out today'
            ], 400);
        }

        // Update clock out
        $attendance->update([
            'clock_out' => Carbon::now(new DateTimeZone('Asia/Singapore')),
        ]);
        return response()->json([
            'message' => 'You have clocked out successfully'
        ]);
    }

    public function getAttendanceOverview(Request $request)
    {
        $filter = $request->filter;

        if ($filter != 'daily' && $filter != 'weekly' && $filter != 'monthly') {
            return response()->json([
                'message' => 'Invalid filter'
            ], 400);
        }

        // Get user
        $user = $request->user();

        // Previous attendance
        $previousAttendances = [];

        // Daily
        if ($filter == 'daily') {
            $attendances = $user->attendances()
                ->where('clock_in', '>', Carbon::now()->startOfWeek())
                ->where('clock_in', '<', Carbon::now()->endOfWeek())
                ->where('clock_out', '!=', null)
                ->get()
                ->sortByDesc('clock_in');

            foreach ($attendances as $attendance) {
                $previousAttendances['labels'][] = Carbon::parse($attendance->clock_in)->rawFormat('D, M d');
                $previousAttendances['data'][] = Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
            }
        }

        // Weekly
        if ($filter == 'weekly') {
            $weeklyAttendances = $user->attendances()
                ->where('clock_in', '>', Carbon::now()->subDay(90))
                ->get()
                ->sortByDesc('clock_in')
                ->groupBy(function ($attendance) {
                    return Carbon::parse($attendance->clock_in)->format('W');
                });

            $weeklyData = [];
            foreach ($weeklyAttendances as $week => $attendances) {
                foreach ($attendances as $attendance) {
                    if (isset($weeklyData[$week])) {
                        $weeklyData[$week] += Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
                    } else {
                        $weeklyData[$week] = Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
                    }
                }
            }

            foreach ($weeklyData as $week => $hour) {
                $previousAttendances['labels'][] = 'Week ' . $week;
                $previousAttendances['data'][] = $hour;
            }
        }

        // Monthly
        if ($filter == 'monthly') {
            $monthlyAttendances = $user->attendances()->get()->sortByDesc('clock_in')->groupBy(function ($attendance) {
                return Carbon::parse($attendance->clock_in)->format('m');
            });

            $monthlyData = [];
            foreach ($monthlyAttendances as $month => $attendances) {
                foreach ($attendances as $attendance) {
                    if (isset($monthlyData[$month])) {
                        $monthlyData[$month] += Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
                    } else {
                        $monthlyData[$month] = Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
                    }
                }
            }

            foreach ($monthlyData as $month => $hour) {
                $previousAttendances['labels'][] = Carbon::createFromFormat('!m', $month)->format('F');
                $previousAttendances['data'][] = $hour;
            }
        }

        return response()->json([
            'previousAttendances' => $previousAttendances,
        ]);
    }
}
