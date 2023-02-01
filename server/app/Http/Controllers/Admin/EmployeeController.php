<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Return employees

    }

    public function store(Request $request)
    {
        // TODO: Save employee
        $email = $request->email;
        $password = $request->password;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $birthday = $request->birthday;
        $gender = $request->gender;
        $address = $request->address;
        $phone = $request->phone;

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
        $result = ValidationUtil::validateGender($address);
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

        // Check if email already exist
        $user = User::where('email', $email)->first();
        if ($user != null) {
            return response()->json([
                'message' => 'Email already exist',
                'type' => 'email'
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
        ]);

        return response()->json([
            'message' => 'Successfully added a new user'
        ]);
    }

    public function show(Request $request)
    {
        // TODO: Return employee by id
    }

    public function update(Request $request)
    {
        // TODO: Update employee by id
    }
}
