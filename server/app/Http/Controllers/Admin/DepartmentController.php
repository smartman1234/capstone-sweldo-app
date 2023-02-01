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
        // Search Department

        if ($request->name == null) {
            $departments = Department::paginate(10);
        } else {
            $departments = Department::where('name', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }
        return response()->json([
            'departments' => $departments,
        ]);
    
    }

    public function store(Request $request)
    {
        // TODO: Save department
        $name = $request->name;

        // Validate Department 
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
        $id = $request->id;

        // Validate id
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Get Department
        $job = Department::find($id);

        // Not found
        if ($job == null) {
            return response()->json([
                'message' => 'Job Title not found',
            ], 400);
        }

        return response()->json([
            'job' => $job,
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->id;

        $name = $request->name;

        // Validate Id of Department
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Validate Department
        $result = ValidationUtil::validateDepartment($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
      
        // Get Department
        $department = Department::find($id);

        // Not found
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }

        $department->update([
            'name' => $name,
        ]);

        return response()->json([
            'message' => 'Department updated successfully'
        ]);
    }
}
