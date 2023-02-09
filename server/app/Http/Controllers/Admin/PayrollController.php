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
    /**
     * Get all payrolls
     */
    public function index(Request $request)
    {
        $timestamp = $request->timestamp;
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }
        $totalDeductions = Deduction::sum('amount');
        $users = User::where('is_admin', 0)->paginate(10);
        $employeesData = [];
        foreach ($users->items() as $user) {
            $totalHours = $this->getTotalHours($timestamp, $user);
            $employeesData[] = [
                'id' => $user->id,
                'name' => $user->first_name . ' ' . $user->last_name,
                'total_hours' => $totalHours,
                'earnings' => ($totalHours * $user->job->salary),
                'deductions' => $totalDeductions,
                'net_pay' => ($totalHours * $user->job->salary) - $totalDeductions
            ];
        }
        $users = $users->toArray();
        $users['data'] = $employeesData;
        return response()->json([
            'payrolls' => $users,
        ]);
    }

    /**
     * Get total hours
     */
    public function getTotalHours($timestamp, User $user)
    {
        $hours = 0;
        $monthlyAttendances = $user->attendances()
            ->where('clock_out', '!=', null)
            ->whereBetween(
                'clock_in',
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

    /**
     * Generate payslips
     */
    public function generatePayslips(Request $request)
    {
        $timestamp = $request->timestamp;
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }
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
                'date',
                [
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->startOfMonth(),
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->endOfMonth()
                ]
            )->first();
            $totalHours = $this->getTotalHours($timestamp, $user);
            if ($payslip == null) {
                $user->payslips()->create([
                    'date' => Carbon::createFromTimestamp($timestamp),
                    'total_hours' => $totalHours,
                    'earnings' => $totalHours * $user->job->salary,
                    'deduction_list' => json_encode($deductionList),
                    'total_deductions' => $totalDeductions,
                    'net_pay' => ($totalHours * $user->job->salary) - $totalDeductions
                ]);
            } else {
                $payslip->update([
                    'date' => Carbon::createFromTimestamp($timestamp),
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

    /**
     * Get payslips
     */
    public function getPayslips(Request $request)
    {
        $timestamp = $request->timestamp;
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }
        $payslips = Payslip::with('user')
            ->whereBetween(
                'date',
                [
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->startOfMonth(),
                    Carbon::createFromTimestamp($timestamp)->addDay(1)->endOfMonth()
                ]
            )->get();
        $newPayslips = [];
        foreach ($payslips as $payslip) {
            $newPayslips[] = [
                'id' => $payslip->id,
                'date' => $payslip->date,
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
