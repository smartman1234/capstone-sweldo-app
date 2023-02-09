<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SalaryHistoryController extends Controller
{
    /**
     * Get payslips
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $payslips = $user->payslips()->orderBy('date', 'desc')->paginate(10);
        return response()->json([
            'salaryHistory' => $payslips,
        ]);
    }
}
