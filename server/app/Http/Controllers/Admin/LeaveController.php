<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    public function index(Request $request)
    {
        if ($request->name == null) {
            $leaves = Leave::paginate(10);
        } else {
            $leaves = Leave::with('user')
                ->whereHas('user', function ($query) use ($request) {
                    $query->where('first_name', 'like', "%" . $request->name . "%")
                        ->orWhere('last_name', 'LIKE', "%" . $request->name . "%")
                        ->orWhere('email', 'LIKE', "%" . $request->name . "%");
                })
                ->paginate(10);
        }
        $employeesName = [];
        foreach ($leaves->items() as $item) {
            $employeesName[] = [
                'id' => $item->id,
                'name' => $item->user->first_name . ' ' . $item->user->last_name,
                'date' => $item->date,
                'status' => $item->status,
            ];
        }
        $leaves = $leaves->toArray();
        $leaves['data'] = $employeesName;
        return response()->json([
            'leaves' => $leaves,
        ]);
    }
}
