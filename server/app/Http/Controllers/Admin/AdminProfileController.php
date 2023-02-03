<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class AdminProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'user' => $user
        ]);
    }

    public function update(Request $request)
    {
        $avatar = $request->avatar;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $birthday = $request->birthday;
        $gender = $request->gender;
        $address = $request->address;
        $phone = $request->phone;

        // Validate avatar
        $result = ValidationUtil::validateAvatar($avatar);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'avatar'
            ], 400);
        }
        // Validate first name
        $result = ValidationUtil::validateFirstName($first_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'first_name'
            ], 400);
        }

        // Validate last name
        $result = ValidationUtil::validateLastName($last_name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'last_name'
            ], 400);
        }

        // Validate birthday
        $result = ValidationUtil::validateBirthday($birthday);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'birthday'
            ], 400);
        }

        // Validate gender
        $result = ValidationUtil::validateGender($gender);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'gender'
            ], 400);
        }

        // Validate address
        $result = ValidationUtil::validateAddress($address);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'address'
            ], 400);
        }

        // Validate phone
        $result = ValidationUtil::validatePhone($phone);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'phone'
            ], 400);
        }

        // Get user
        $user = $request->user();

         // Add image to storage
         if ($avatar != null) {
            $avatar = $request->file('avatar')->store('avatars');
        }

        // Update
        $user->update([
            'avatar' => $avatar,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'birthday' => $birthday,
            'gender' => $gender,
            'address' => $address,
            'phone' => $phone,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully'
        ]);
    }
}
