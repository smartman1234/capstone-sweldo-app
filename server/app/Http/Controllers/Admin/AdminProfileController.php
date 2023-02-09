<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class AdminProfileController extends Controller
{
    /**
     * Get profile
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $user->avatar = $user->avatar == null ? $user->avatar : URL::asset('storage/' . $user->avatar);
        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Update profile
     */
    public function update(Request $request)
    {
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $birthday = $request->birthday;
        $gender = $request->gender;
        $address = $request->address;
        $phone = $request->phone;
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
        $user = $request->user();
        $user->update([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'birthday' => $birthday,
            'gender' => $gender,
            'address' => $address,
            'phone' => $phone,
        ]);
        return response()->json([
            'message' => 'Profile updated successfully',
            'first_name' => $first_name,
        ]);
    }

    /**
     * Update avatar
     */
    public function updateAvatar(Request $request)
    {
        $image = $request->file('image');
        $result = ValidationUtil::validateAvatar($image);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'avatar'
            ], 400);
        }
        $imagePath = Storage::disk('public')->put('/images', $image);
        $user = $request->user();
        $user->update([
            'avatar' => $imagePath
        ]);
        return response()->json([
            'message' => 'Avatar uploaded successfully',
            'avatar' => URL::asset('storage/' . $user->avatar)
        ]);
    }
}
