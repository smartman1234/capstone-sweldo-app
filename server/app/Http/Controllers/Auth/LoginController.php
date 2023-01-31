<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        // Validate email
        $result = ValidationUtil::validateEmail($email);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'email'
            ], 400);
        }

        // Validate password
        $result = ValidationUtil::validatePassword($password);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'password'
            ], 400);
        }

        // Set credentials
        $credentials = [
            'email' => $email,
            'password' => $password
        ];

        // Authenticate user
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Credentials does not match our records.',
            ], 400);
        }

        return response()->json([
            'message' => 'Login successfully',
        ]);
    }
}
