<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * Get all jobs
     */
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

    /**
     * Create new job
     */
    public function store(Request $request)
    {
        $name = $request->name;
        $salary = $request->salary;
        $result = ValidationUtil::validateJobTitle($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
        $result = ValidationUtil::validateSalary($salary);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'salary'
            ], 400);
        }
        Job::create([
            'name' => $name,
            'salary' => $salary,
        ]);
        return response()->json([
            'message' => 'Successfully added a new Job Title'
        ]);
    }

    /**
     * Get job
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $job = Job::find($id);
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }
        return response()->json([
            'job' => $job,
        ]);
    }

    /**
     * Update job
     */
    public function update(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $salary = $request->salary;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $result = ValidationUtil::validateJobTitle($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
        $result = ValidationUtil::validateSalary($salary);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'salary'
            ], 400);
        }
        $job = Job::find($id);
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }
        $job->update([
            'name' => $name,
            'salary' => $salary,
        ]);
        return response()->json([
            'message' => 'Job updated successfully'
        ]);
    }

    /**
     * Delete job
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'id'
            ], 400);
        }
        $job = Job::find($id);
        if ($job == null) {
            return response()->json([
                'message' => 'Job not found',
            ], 400);
        }
        $count = User::where('job_id', $id)->count();
        if ($count != 0) {
            return response()->json([
                'message' => 'Please remove all employee in this job first',
            ], 400);
        }
        $job->delete();
        return response()->json([
            'message' => 'Job deleted successfully'
        ]);
    }
}
