<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deduction;
use App\Models\Payslip;
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

    public function generatePayslips(Request $request)
    {
        $timestamp = $request->timestamp;

        // Validate date
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }

        // Get deduction list
        $totalDeductions = 0;
        $deductionList = [];
        $deductions = Deduction::get();
        foreach ($deductions as $deduction) {
            $totalDeductions += $deduction->amount;
            $deductionList[] = [
                'name' => $deduction->name,
                'amount' => $deduction->amount
            ];
        }

        $users = User::where('is_admin', 0)->get();

        foreach ($users as $user) {
            $payslip = $user->payslips()->whereBetween(
                'created_at',
                [
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->startOfMonth(),
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->endOfMonth()
                ]
            )->first();

            // Get total hours
            $totalHours = $this->getTotalHours($timestamp, $user);

            // Create or update payslip
            if ($payslip == null) {
                $user->payslips()->create([
                    'total_hours' => $totalHours,
                    'earnings' => $totalHours * $user->job->salary,
                    'deduction_list' => json_encode($deductionList),
                    'total_deductions' => $totalDeductions,
                    'net_pay' => ($totalHours * $user->job->salary) - $totalDeductions
                ]);
            } else {
                $user->payslips()->update([
                    'total_hours' => $totalHours,
                    'earnings' => $totalHours * $user->job->salary,
                    'deduction_list' => json_encode($deductionList),
                    'total_deductions' => $totalDeductions,
                    'net_pay' => ($totalHours * $user->job->salary) - $totalDeductions
                ]);
            }
        }

        return response()->json([
            'message' => 'Done',
        ]);
    }

    public function getPayslips(Request $request)
    {
        $timestamp = $request->timestamp;

        // Validate date
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }

        // TODO: Return department and job
        $payslips = Payslip::with('user')
            ->whereBetween(
                'created_at',
                [
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->startOfMonth(),
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->endOfMonth()
                ]
            )->get();

        $newPayslips = [];
        foreach ($payslips as $payslip) {
            $newPayslips[] = [
                'id' => $payslip->id,
                'name' => $payslip->user->first_name . ' ' . $payslip->user->last_name,
                'department' => $payslip->user->department->name,
                'job' => $payslip->user->job->name,
                'earnings' => $payslip->earnings,
                'deduction_list' => json_decode($payslip->deduction_list, true),
                'total_deductions' => $payslip->total_deductions,
                'net_pay' => $payslip->net_pay,
                'created_at' => $payslip->created_at,
            ];
        }

        return response()->json([
            'payslips' => $newPayslips,
        ]);
    }
}
