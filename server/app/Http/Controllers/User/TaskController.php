<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Utils\ValidationUtil;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Get monthly tasks
     */
    public function getMonthlyTasks(Request $request)
    {
        $timestamp = $request->timestamp;
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }
        $tasks = $request->user()->tasks()->whereBetween(
            'date',
            [
                Carbon::createFromTimestamp($timestamp)->addDay(1)->startOfMonth(),
                Carbon::createFromTimestamp($timestamp)->addDay(1)->endOfMonth()
            ]
        )->get();
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

    /**
     * Get daily tasks
     */
    public function getDailyTasks(Request $request)
    {
        $timestamp = $request->timestamp;
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }
        $tasks = $request->user()->tasks()
            ->whereDate('date', Carbon::createFromTimestamp($timestamp)->addDay(1)->toDateString())
            ->get();
        return response()->json([
            'tasks' => $tasks
        ]);
    }

    /**
     * Create new task
     */
    public function store(Request $request)
    {
        $name = $request->name;
        $timestamp = $request->date;
        $result = ValidationUtil::validateTaskName($name);
        if ($result != null) {
            return response()->json([
                'message' => $result,
                'type' => 'name'
            ], 400);
        }
        $result = ValidationUtil::validateTimestamp($timestamp);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }
        $newTask = $request->user()->tasks()->create([
            'name' => $name,
            'date' => Carbon::createFromTimestamp($timestamp)->addDay(1)
        ]);
        return response()->json([
            'message' => 'Created task successfully',
            'task' => $newTask
        ]);
    }

    /**
     * Delete task
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $result = ValidationUtil::validateId($id);
        if ($result != null) {
            return response()->json([
                'message' => $result,
            ], 400);
        }
        $task = $request->user()->tasks()->find($id);
        if ($task == null) {
            return response()->json([
                'message' => 'Task not found',
            ], 400);
        }
        $task->delete();
        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }
}
