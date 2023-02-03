<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\User;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
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
        $name = $request->name;

        // Validate department 
        $result = ValidationUtil::validateDepartment($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        // Create department
        Department::create([
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

        // Get department
        $department = Department::find($id);

        // Not found
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }

        return response()->json([
            'department' => $department,
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

        // Update
        $department->update([
            'name' => $name,
        ]);

        return response()->json([
            'message' => 'Department updated successfully'
        ]);
    }

    public function destroy(Request $request)
    {
        // Delete department
        $id = $request->id;

        // Validate id 
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Get department
        $department = Department::find($id);

        // Not found
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }

        // Count user with this department
        $count = User::where('department_id', $id)->count();
        if ($count != 0) {
            return response()->json([
                'message' => 'Please remove all employee in this department first',
            ], 400);
        }

        // Delete
        $department->delete();

        return response()->json([
            'message' => 'Department deleted successfully'
        ]);
    }
}
