<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    public function index(Request $request)
    {
        // Get user
        $user = $request->user();

        if ($request->name == null) {
            $leaves =  $user->leaves()->paginate(10);
        } else {
            $leaves = $user->leaves()->where('name', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }

        return response()->json([
            'leaves' => $leaves,
        ]);
    }

    public function store(Request $request)
    {
        $date = $request->date;
        $reason = $request->reason;

        // Validate date
        $result = ValidationUtil::validateDate($date);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'date'
            ], 400);
        }

        // Validate reason
        $result = ValidationUtil::validateReason($reason);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'reason'
            ], 400);
        }

        // Get user
        $user = $request->user();

        // Create
        $user->leaves()->create([
            'date' => $date,
            'reason' => $reason
        ]);

        return response()->json([
            'message' => 'Successfully added a new Leave'
        ]);
    }

    public function show(Request $request)
    {
        $id = $request->id;

        // Validate id
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Get leave
        $leave = Leave::find($id);

        // Not found
        if ($leave == null) {
            return response()->json([
                'message' => 'Leave not found',
            ], 400);
        }

        return response()->json([
            'leave' => $leave,
        ]);
    }
}
