<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deduction;
use App\Models\User;
use App\Utils\ValidationUtil;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PayrollController extends Controller
{
    public function index(Request $request)
    {
        $timestamp = $request->timestamp;

        // Validate date
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }

        // Get all deductions
        $deductions = Deduction::sum('amount');

        // Get all users
        $users = User::where('is_admin', 0)->paginate(10);

        $employeesData = [];
        foreach ($users->items() as $user) {

            // Get total hours per user
            $totalHours = $this->getTotalHours($timestamp, $user);

            $employeesData[] = [
                'id' => $user->id,
                'name' => $user->first_name . ' ' . $user->last_name,
                'totalHours' => $totalHours,
                'deductions' => $deductions,
                'earnings' => ($totalHours * $user->job->salary) - $deductions,
            ];
        }

        $users = $users->toArray();
        $users['data'] = $employeesData;

        return response()->json([
            'payrolls' => $users,
        ]);
    }

    public function getTotalHours($timestamp, User $user)
    {
        $hours = 0;
        $monthlyAttendances = $user->attendances()->whereBetween(
            'created_at',
            [
                Carbon::createFromTimestamp($timestamp)->addDay(1)->startOfMonth(),
                Carbon::createFromTimestamp($timestamp)->addDay(1)->endOfMonth()
            ]
        )->get();
        foreach ($monthlyAttendances as $attendance) {
            $hours += Carbon::parse($attendance->clock_in)->diffInHours(Carbon::parse($attendance->clock_out));
        }
        return $hours;
    }
}
