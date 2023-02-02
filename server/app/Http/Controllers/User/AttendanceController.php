<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function clockIn(Request $request)
    {
        // Get user
        $user = $request->user();

        // Get attendance today
        $attendance = $user->attendances()->where('created_at', '>=', Carbon::now()->startOfDay())->first();
        if ($attendance != null) {
            return response()->json([
                'message' => 'You have already clocked in today'
            ], 400);
        }

        // Create new attendance
        $user->attendances()->create([
            'clock_in' => Carbon::now(),
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
        $attendance = $user->attendances()->where('created_at', '>=', Carbon::now()->startOfDay())->first();
        if ($attendance != null && $attendance->clock_out !== null) {
            return response()->json([
                'message' => 'You have already clocked out today'
            ], 400);
        }

        // Update clock out
        $attendance->update([
            'clock_out' => now(),
        ]);
        return response()->json([
            'message' => 'You have clocked out successfully'
        ]);
    }

    public function getAttendanceOverview(Request $request)
    {
        // Get user
        $user = $request->user();

        // Previous attendance
        $previousAttendances = [];
        for ($day = 1; $day <= 5; $day++) {
            $attendance = $user->attendances()->whereBetween(
                'created_at',
                [
                    Carbon::now()->subDay($day)->startOfDay(),
                    Carbon::now()->subDay($day)->endOfDay()
                ]
            )->first();
            if ($attendance != null) {
                $previousAttendances['labels'][] = Carbon::now()->subDay($day)->rawFormat('M d');
                $previousAttendances['data'][] = Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
            }
        }

        return response()->json([
            'previousAttendances' => $previousAttendances,
        ]);
    }
}
