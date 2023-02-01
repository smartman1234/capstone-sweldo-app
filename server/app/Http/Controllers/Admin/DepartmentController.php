<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Return departments
    }

    public function store(Request $request)
    {
        // TODO: Save department
        $name = $request->name;

        // Validate Job Title
        $result = ValidationUtil::validateDepartment($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        $department = Department::create([
            'name' => $name,
        ]);

        return response()->json([
            'message' => 'Successfully added a new Department'
        ]);
    }

    public function show(Request $request)
    {
        // TODO: Return department by id
    }

    public function update(Request $request)
    {
        // TODO: Update department by id
    }
}
