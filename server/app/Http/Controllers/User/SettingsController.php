<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller
{
    public function update(Request $request)
    {
        $old_password = $request->old_password;
        $new_password = $request->new_password;

        // Validate old password
        $result = ValidationUtil::validatePassword($old_password);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'old_password'
            ], 400);
        }

        // Validate new password
        $result = ValidationUtil::validatePassword($new_password);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'new_password'
            ], 400);
        }

        // Get user
        $user = $request->user();
        
        // Check if correct old password
        if (!Hash::check($old_password, $user->password)) {
            return response()->json([
                'message' => 'Invalid old password',
                'type' => 'old_password'
            ], 400);
        }

        // Update password
        $user->update([
            'password' => Hash::make($new_password),
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }
}
