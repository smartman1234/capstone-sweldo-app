<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Return employees

    }

    public function store(Request $request)
    {
        // TODO: Save employee
        $email = $request->email;
        $password = $request->password;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $birthday = $request->birthday;
        $gender = $request->gender;
        $address = $request->address;
        $phone = $request->phone;
    }

    public function show(Request $request)
    {
        // TODO: Return employee by id
    }

    public function update(Request $request)
    {
        // TODO: Update employee by id
    }
}
