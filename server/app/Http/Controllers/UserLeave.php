<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use Illuminate\Http\Request;

class UserLeave extends Controller
{
    public function index(Request $request)
    {

            $leaves = Leave::paginate(10);

        return response()->json([
            'leaves' => $leaves,
        ]);
    }

    public function store (Request $request) 
    {
        
    }
}
