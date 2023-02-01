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
    public function index(Request $request)
    {
        if ($request->name == null) {
            $employees = User::where('is_admin', 0)->paginate(10);
        } else {
            $employees = User::where('is_admin', 0)
                ->where('first_name', 'LIKE', "%" . $request->name . "%")
                ->orWhere('last_name', 'LIKE', "%" . $request->name . "%")
                ->orWhere('email', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }
        return response()->json([
            'employees' => $employees,
        ]);
    }

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
        $departmentId = $request->department;
        $jobId = $request->job;

        // Validate Email
        $result = ValidationUtil::validateEmail($email);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'email'
            ], 400);
        }

        // Validate Password
        $result = ValidationUtil::validatePassword($password);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'password'
            ], 400);
        }

        // Validate First Name
        $result = ValidationUtil::validateFirstName($first_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'first_name'
            ], 400);
        }

        // Validate Last Name
        $result = ValidationUtil::validateLastName($last_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'last_name'
            ], 400);
        }

        // Validate Birth Date
        $result = ValidationUtil::validateBirthday($birthday);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'birthday'
            ], 400);
        }

        // Validate Gender
        $result = ValidationUtil::validateGender($gender);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'gender'
            ], 400);
        }

        // Validate Address
        $result = ValidationUtil::validateAddress($address);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'address'
            ], 400);
        }

        // Validate Phone number
        $result = ValidationUtil::validatePhone($phone);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'phone'
            ], 400);
        }

        // Validate department id
        $result = ValidationUtil::validateId($departmentId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'department'
            ], 400);
        }

        // Validate job id
        $result = ValidationUtil::validateId($jobId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'job'
            ], 400);
        }

        // Check if email already exist
        $user = User::where('email', $email)->first();
        if ($user != null) {
            return response()->json([
                'message' => 'Email already exist',
                'type' => 'email'
            ], 400);
        }

        // Get department
        $department = Department::find($departmentId);

        // Not found
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }

        // Get job
        $job = Job::find($jobId);

        // Not found
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }

        // Create new user
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

        // Get employee
        $employee = User::find($id);

        // Not found
        if ($employee == null) {
            return response()->json([
                'message' => 'Employee not found',
            ], 400);
        }

        return response()->json([
            'employee' => $employee,
        ]);
    }

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

        // Validate id
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Validate Email
        $result = ValidationUtil::validateEmail($email);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'email'
            ], 400);
        }

        // Validate First Name
        $result = ValidationUtil::validateFirstName($first_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'first_name'
            ], 400);
        }

        // Validate Last Name
        $result = ValidationUtil::validateLastName($last_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'last_name'
            ], 400);
        }

        // Validate Birth Date
        $result = ValidationUtil::validateBirthday($birthday);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'birthday'
            ], 400);
        }

        // Validate Gender
        $result = ValidationUtil::validateGender($gender);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'gender'
            ], 400);
        }

        // Validate Address
        $result = ValidationUtil::validateAddress($address);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'address'
            ], 400);
        }

        // Validate Phone number
        $result = ValidationUtil::validatePhone($phone);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'phone'
            ], 400);
        }

        // Validate department id
        $result = ValidationUtil::validateId($departmentId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'department'
            ], 400);
        }

        // Validate job id
        $result = ValidationUtil::validateId($jobId);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'job'
            ], 400);
        }

        // Get employee
        $employee = User::find($id);

        // Not found
        if ($employee == null) {
            return response()->json([
                'message' => 'Employee not found',
            ], 400);
        }

        // Get department
        $department = Department::find($departmentId);

        // Not found
        if ($department == null) {
            return response()->json([
                'message' => 'Department not found',
            ], 400);
        }

        // Get job
        $job = Job::find($jobId);

        // Not found
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }

        // Update
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
}
