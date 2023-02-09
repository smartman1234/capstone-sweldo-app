<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class LoginController extends Controller
{
    /**
     * Login
     */
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
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
        $credentials = [
            'email' => $email,
            'password' => $password
        ];
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Credentials does not match our records.',
            ], 400);
        }
        $user = $request->user();
        $accessToken = $user->createToken('Personal Access Token')->accessToken;
        return response()->json([
            'user' => [
                'id' => $user->id,
                'avatar' => $user->avatar == null ? $user->avatar : URL::asset('storage/' . $user->avatar),
                'email' => $user->email,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'is_admin' => $user->is_admin,
                'access_token' => $accessToken,
            ]
        ]);
    }
}
