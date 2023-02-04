<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class AdminProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        
        // Change to url of avatar
        $user->avatar = URL::asset('storage/' . $user->avatar);

        return response()->json([
            'user' => $user
        ]);
    }

    public function update(Request $request)
    {

        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $birthday = $request->birthday;
        $gender = $request->gender;
        $address = $request->address;
        $phone = $request->phone;

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

        // Update
        $user->update([
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

    public function updateAvatar(Request $request)
    {
        $image = $request->file('image');

        // Validate image
        $result = ValidationUtil::validateAvatar($image);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'avatar'
            ], 400);
        }
        
        // Store image and save path
        $imagePath = Storage::disk('public')->put('/images', $image);

        // Get user
        $user = $request->user();

        // Update
        $user->update([
            'avatar' => $imagePath
        ]);

        return response()->json([
            'message' => 'Avatar uploaded successfully'
        ]);
    }
}
