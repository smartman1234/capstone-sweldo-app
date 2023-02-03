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

        // Validate date
        $result = ValidationUtil::validateDate($date);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'date'
            ], 400);
        }

        // Get user
        $user = $request->user();

        // Create
        $user->leaves()->create([
            'date' => $date
        ]);

        return response()->json([
            'message' => 'Successfully added a new Leave'
        ]);
    }
}
