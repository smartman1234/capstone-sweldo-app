<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Return jobs
    }

    public function store(Request $request)
    {
        // TODO: Save job
        $name = $request->name;

        // Validate Job Title
        $result = ValidationUtil::validateJobTitle($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        $job = Job::create([
            'name' => $name,
        ]);

        return response()->json([
            'message' => 'Successfully added a new Job Title'
        ]);
    }

    public function show(Request $request)
    {
        // TODO: Return job by id
    }

    public function update(Request $request)
    {
        // TODO: Update job by id
    }
}
