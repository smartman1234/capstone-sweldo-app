<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deduction;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class DeductionController extends Controller
{
    public function index(Request $request)
    {
        if ($request->name == null) {
            $deductions = Deduction::paginate(10);
        } else {
            $deductions = Deduction::where('name', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }
        return response()->json([
            'deductions' => $deductions,
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->name;
        $amount = $request->amount;

        // Validate job
        $result = ValidationUtil::validateDeductionName($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        // Validate salary
        $result = ValidationUtil::validateDeductionAmount($amount);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'amount'
            ], 400);
        }

        // Create
        Deduction::create([
            'name' => $name,
            'amount' => $amount,
        ]);

        return response()->json([
            'message' => 'Successfully added a new Deduction'
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

        // Get job
        $deduction = Deduction::find($id);

        // Not found
        if ($deduction == null) {
            return response()->json([
                'message' => 'Deduction not found',
            ], 400);
        }

        return response()->json([
            'deduction' => $deduction,
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $amount = $request->amount;

        // Validate id
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Validate job
        $result = ValidationUtil::validateDeductionName($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        // Validate salary
        $result = ValidationUtil::validateDeductionAmount($amount);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'amount'
            ], 400);
        }

        // Get job
        $deduction = Deduction::find($id);

        // Not found
        if ($deduction == null) {
            return response()->json([
                'message' => 'Deduction not found',
            ], 400);
        }

        // Update
        $deduction->update([
            'name' => $name,
            'amount' => $amount,
        ]);

        return response()->json([
            'message' => 'Deduction updated successfully'
        ]);
    }
}
