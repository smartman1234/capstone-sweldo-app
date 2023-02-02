<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function clockIn(Request $request)
    {
        // Check if user has clocked in today
        // If yes, return error message
        // If no, create new attendance record

        $attendance = $request->user()->attendances()->where('created_at', '>=', now()->startOfDay())->first();

        if ($attendance !== null) {
            return response()->json([
                'message' => 'You have already clocked in today'
            ],400);
        }

        $request->user()->attendances()->create([
            'clock_in' => now(),
        ]);
        return response()->json([
            'message' => 'You have clocked in successfully'
        ]);

    }

    public function clockOut(Request $request)
    {

        // Check if user has clocked in today
        // If yes, update clock out time
        // If no, return error message


        $attendance = $request->user()->attendances()->where('created_at', '>=', now()->startOfDay())->first();
        
        if ($attendance !== null && $attendance->clock_out !== null) {
            return response()->json([
                'message' => 'You have already clocked out today'
            ],400);
        }

        $attendance->update([
            'clock_out' => now(),
        ]);
        return response()->json([
            'message' => 'You have clocked out successfully'
        ]);

    }
    
}
