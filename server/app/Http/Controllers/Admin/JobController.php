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
        if ($request->name == null) {
            $jobs = Job::paginate(10);
        } else {
            $jobs = Job::where('name', 'LIKE', "%" . $request->name . "%")->paginate(10);
        }
        return response()->json([
            'jobs' => $jobs,
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->name;
        $salary = $request->salary;

        // Validate job
        $result = ValidationUtil::validateJobTitle($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        // Validate salary
        $result = ValidationUtil::validateSalary($salary);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'salary'
            ], 400);
        }

        // Create
        Job::create([
            'name' => $name,
            'salary' => $salary,
        ]);

        return response()->json([
            'message' => 'Successfully added a new Job Title'
        ]);
    }

    public function show(Request $request)
    {
        $id = $request->id;

        // Validate id
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Get job
        $job = Job::find($id);

        // Not found
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }

        return response()->json([
            'job' => $job,
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $salary = $request->salary;

        // Validate id
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }

        // Validate job
        $result = ValidationUtil::validateJobTitle($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        // Validate salary
        $result = ValidationUtil::validateSalary($salary);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'salary'
            ], 400);
        }

        // Get job
        $job = Job::find($id);

        // Not found
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }

        // Update
        $job->update([
            'name' => $name,
            'salary' => $salary,
        ]);

        return response()->json([
            'message' => 'Job updated successfully'
        ]);
    }
}
