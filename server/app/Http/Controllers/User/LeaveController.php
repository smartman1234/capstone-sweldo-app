<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    /**
     * Get all leaves
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($request->name == null) {
            $leaves = $user->leaves()->paginate(10);
        } else {
            $leaves = $user->leaves()->where('name', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }
        return response()->json([
            'leaves' => $leaves,
        ]);
    }

    /**
     * Create new leave
     */
    public function store(Request $request)
    {
        $date = $request->date;
        $reason = $request->reason;
        $result = ValidationUtil::validateDate($date);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'date'
            ], 400);
        }
        $result = ValidationUtil::validateReason($reason);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'reason'
            ], 400);
        }
        $user = $request->user();
        $user->leaves()->create([
            'date' => $date,
            'reason' => $reason
        ]);
        return response()->json([
            'message' => 'Successfully added a new Leave'
        ]);
    }

    /**
     * Get leave
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $leave = Leave::find($id);
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
