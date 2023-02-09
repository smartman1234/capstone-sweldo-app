<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\User;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Get all departments
     */
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

    /**
     * Create new department
     */
    public function store(Request $request)
    {
        $name = $request->name;
        $result = ValidationUtil::validateDepartment($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
        Department::create([
            'name' => $name,
        ]);
        return response()->json([
            'message' => 'Successfully added a new Department'
        ]);
    }

    /**
     * Get department
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
        $department = Department::find($id);
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }
        return response()->json([
            'department' => $department,
        ]);
    }

    /**
     * Update department
     */
    public function update(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $result = ValidationUtil::validateDepartment($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
        $department = Department::find($id);
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

    /**
     * Delete department
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
        $department = Department::find($id);
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }
        $count = User::where('department_id', $id)->count();
        if ($count != 0) {
            return response()->json([
                'message' => 'Please remove all employee in this department first',
            ], 400);
        }
        $department->delete();
        return response()->json([
            'message' => 'Department deleted successfully'
        ]);
    }
}
