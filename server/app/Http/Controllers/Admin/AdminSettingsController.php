<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminSettingsController extends Controller
{
    /**
     * Update password
     */
    public function update(Request $request)
    {
        $old_password = $request->old_password;
        $new_password = $request->new_password;
        $result = ValidationUtil::validatePassword($old_password);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'old_password'
            ], 400);
        }
        $result = ValidationUtil::validatePassword($new_password);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'new_password'
            ], 400);
        }
        $user = $request->user();
        if (!Hash::check($old_password, $user->password)) {
            return response()->json([
                'message' => 'Invalid old password',
                'type' => 'old_password'
            ], 400);
        }
        $user->update([
            'password' => Hash::make($new_password),
        ]);
        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }
}
