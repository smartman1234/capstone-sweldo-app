<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if not logged in
        if (!Auth::check()) {
            abort(response()->json([
                'message' => 'Please login.',
            ], 401));
        }

        // Check if not admin
        if (Auth::user()->is_admin != 1) {
            abort(404);
        }

        return $next($request);
    }
}
