<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function getMonthlyTasks(Request $request)
    {
        $timestamp = $request->timestamp;

        // Validate date
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }

        // Get tasks in selected month
        $tasks = $request->user()->tasks()->whereBetween(
            'date',
            [
                Carbon::createFromTimestamp($timestamp)->addDay(1)->startOfMonth(),
                Carbon::createFromTimestamp($timestamp)->addDay(1)->endOfMonth()
            ]
        )->get();

        // Count tasks
        $taskList = [];
        foreach ($tasks as $task) {
            $day = (int) Carbon::parse($task->date)->rawFormat('d');
            if (isset($taskList[$day])) {
                $taskList[$day]++;
            } else {
                $taskList[$day] = 1;
            }
        }

        return response()->json([
            'tasks' => $taskList
        ]);
    }

    public function getDailyTasks(Request $request)
    {
        $timestamp = $request->timestamp;

        // Validate timestamp
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }

        // Get all task by date
        $tasks = $request->user()->tasks()
            ->whereDate('date', Carbon::createFromTimestamp($timestamp)->addDay(1)->toDateString())
            ->get();

        return response()->json([
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->name;
        $timestamp = $request->date;

        // Validate task name
        $result = ValidationUtil::validateTaskName($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }

        // Validate timestamp
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }

        // Create new task
        $newTask = $request->user()->tasks()->create([
            'name' => $name,
            'date' => Carbon::createFromTimestamp($timestamp)->addDay(1)
        ]);

        return response()->json([
            'message' => 'Created task successfully',
            'task' => $newTask
        ]);
    }

    public function destroy(Request $request)
    {
        $id = $request->id;

        // Validate id
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }

        // Get task
        $task = $request->user()->tasks()->find($id);

        // Not found
        if ($task == null) {
            return response()->json([
                'message' => 'Task not found',
            ], 400);
        }

        // Delete
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }
}
