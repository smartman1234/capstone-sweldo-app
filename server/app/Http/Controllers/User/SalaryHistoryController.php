<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SalaryHistoryController extends Controller
{
    public function index(Request $request)
    {
        // Get user
        $user = $request->user();

        // Get payslips
        $payslips = $user->payslips()->orderBy('date', 'desc')->paginate(10);

        return response()->json([
            'salaryHistory' => $payslips,
        ]);
    }
}
