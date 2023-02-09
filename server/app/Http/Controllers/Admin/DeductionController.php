<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deduction;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class DeductionController extends Controller
{
    /**
     * Get all deductions
     */
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

    /**
     * Create new deduction
     */
    public function store(Request $request)
    {
        $name = $request->name;
        $amount = $request->amount;
        $result = ValidationUtil::validateDeductionName($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
        $result = ValidationUtil::validateDeductionAmount($amount);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'amount'
            ], 400);
        }
        Deduction::create([
            'name' => $name,
            'amount' => $amount,
        ]);
        return response()->json([
            'message' => 'Successfully added a new Deduction'
        ]);
    }

    /**
     * Get deduction
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
        $deduction = Deduction::find($id);
        if ($deduction == null) {
            return response()->json([
                'message' => 'Deduction not found',
            ], 400);
        }
        return response()->json([
            'deduction' => $deduction,
        ]);
    }

    /**
     * Update deduction
     */
    public function update(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $amount = $request->amount;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $result = ValidationUtil::validateDeductionName($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
        $result = ValidationUtil::validateDeductionAmount($amount);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'amount'
            ], 400);
        }
        $deduction = Deduction::find($id);
        if ($deduction == null) {
            return response()->json([
                'message' => 'Deduction not found',
            ], 400);
        }
        $deduction->update([
            'name' => $name,
            'amount' => $amount,
        ]);
        return response()->json([
            'message' => 'Deduction updated successfully'
        ]);
    }

    /**
     * Delete deduction
     */
    public function destroy(Request $request)
    {        
        $id = $request->id;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $deduction = Deduction::find($id);
        if ($deduction == null) {
            return response()->json([
                'message' => 'Deduction not found',
            ], 400);
        }
        $deduction->delete();
        return response()->json([
            'message' => 'Deduction deleted successfully'
        ]);
    }
}
