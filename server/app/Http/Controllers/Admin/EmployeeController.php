<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Job;
use App\Models\User;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    /**
     * Get all employees
     */
    public function index(Request $request)
    {
        if ($request->name == null) {
            $employees = User::with('department')
                ->with('job')
                ->where('is_admin', 0)->paginate(10);
        } else {
            $employees = User::with('department')
                ->with('job')
                ->where('is_admin', 0)
                ->where('first_name', 'LIKE', "%" . $request->name . "%")
                ->orWhere('last_name', 'LIKE', "%" . $request->name . "%")
                ->orWhere('email', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }
        return response()->json([
            'employees' => $employees,
        ]);
    }

    /**
     * Create new employee
     */
    public function store(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $birthday = $request->birthday;
        $gender = $request->gender;
        $address = $request->address;
        $phone = $request->phone;
        $departmentId = $request->department_id;
        $jobId = $request->job_id;
        $result = ValidationUtil::validateEmail($email);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'email'
            ], 400);
        }
        $result = ValidationUtil::validatePassword($password);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'password'
            ], 400);
        }
        $result = ValidationUtil::validateFirstName($first_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'first_name'
            ], 400);
        }
        $result = ValidationUtil::validateLastName($last_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'last_name'
            ], 400);
        }
        $result = ValidationUtil::validateBirthday($birthday);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'birthday'
            ], 400);
        }
        $result = ValidationUtil::validateGender($gender);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'gender'
            ], 400);
        }
        $result = ValidationUtil::validateAddress($address);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'address'
            ], 400);
        }
        $result = ValidationUtil::validatePhone($phone);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'phone'
            ], 400);
        }
        $result = ValidationUtil::validateId($departmentId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'department'
            ], 400);
        }
        $result = ValidationUtil::validateId($jobId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'job'
            ], 400);
        }
        $user = User::where('email', $email)->first();
        if ($user != null) {
            return response()->json([
                'message' => 'Email already exist',
                'type' => 'email'
            ], 400);
        }
        $department = Department::find($departmentId);
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }
        $job = Job::find($jobId);
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }
        $user = User::create([
            'email' => $email,
            'password' => Hash::make($password),
            'first_name' => $first_name,
            'last_name' => $last_name,
            'birthday' => $birthday,
            'gender' => $gender,
            'address' => $address,
            'phone' => $phone,
            'department_id' => $department->id,
            'job_id' => $job->id,
        ]);
        return response()->json([
            'message' => 'Successfully added a new user'
        ]);
    }

    /**
     * Get employee
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
        $employee = User::find($id);
        if ($employee == null) {
            return response()->json([
                'message' => 'Employee not found',
            ], 400);
        }
        return response()->json([
            'employee' => $employee,
        ]);
    }

    /**
     * Update employee
     */
    public function update(Request $request)
    {
        $id = $request->id;
        $email = $request->email;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $birthday = $request->birthday;
        $gender = $request->gender;
        $address = $request->address;
        $phone = $request->phone;
        $departmentId = $request->department_id;
        $jobId = $request->job_id;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $result = ValidationUtil::validateEmail($email);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'email'
            ], 400);
        }
        $result = ValidationUtil::validateFirstName($first_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'first_name'
            ], 400);
        }
        $result = ValidationUtil::validateLastName($last_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'last_name'
            ], 400);
        }
        $result = ValidationUtil::validateBirthday($birthday);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'birthday'
            ], 400);
        }
        $result = ValidationUtil::validateGender($gender);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'gender'
            ], 400);
        }
        $result = ValidationUtil::validateAddress($address);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'address'
            ], 400);
        }
        $result = ValidationUtil::validatePhone($phone);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'phone'
            ], 400);
        }
        $result = ValidationUtil::validateId($departmentId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'department'
            ], 400);
        }
        $result = ValidationUtil::validateId($jobId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'job'
            ], 400);
        }
        $employee = User::find($id);
        if ($employee == null) {
            return response()->json([
                'message' => 'Employee not found',
            ], 400);
        }
        $department = Department::find($departmentId);
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }
        $job = Job::find($jobId);
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }
        $employee->update([
            'email' => $email,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'birthday' => $birthday,
            'gender' => $gender,
            'address' => $address,
            'phone' => $phone,
            'department_id' => $department->id,
            'job_id' => $job->id,
        ]);
        return response()->json([
            'message' => 'Employee updated successfully'
        ]);
    }

    /**
     * Delete employee
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
        $employee = User::find($id);
        if ($employee == null) {
            return response()->json([
                'message' => 'Employee not found',
            ], 400);
        }
        $employee->delete();
        return response()->json([
            'message' => 'Employee deleted successfully'
        ]);
    }
}
