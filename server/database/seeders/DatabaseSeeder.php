<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Deduction;
use App\Models\Department;
use App\Models\Job;
use App\Models\Leave;
use App\Models\User;
use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Department::create([
            'name' => 'IT Department'
        ]);

        Department::create([
            'name' => 'Marketing Department'
        ]);

        Job::create([
            'name' => 'Software Engineer',
            'salary' => 5000,
        ]);

        Job::create([
            'name' => 'Junior Developer',
            'salary' => 1000
        ]);

        Deduction::create([
            'name' => 'SSS',
            'amount' => 800
        ]);

        Deduction::create([
            'name' => 'Phil Health',
            'amount' => 300
        ]);

        Deduction::create([
            'name' => 'Pag Ibig',
            'amount' => 100
        ]);

        User::create([
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'first_name' => 'Admin',
            'last_name' => 'Account',
            'birthday' => new DateTime(),
            'gender' => 'male',
            'address' => 'test address',
            'phone' => 'phone',
            'is_admin' => 1,
            'department_id' => 1,
            'job_id' => 1,
        ]);

        User::create([
            'email' => 'test@gmail.com',
            'password' => Hash::make('password'),
            'first_name' => 'Test',
            'last_name' => 'Account',
            'birthday' => new DateTime(),
            'gender' => 'male',
            'address' => 'test address',
            'phone' => 'phone',
            'department_id' => 1,
            'job_id' => 1,
        ]);
        
        User::factory(100)->create();

        // Leaves
        for ($i = 0; $i <= 30; $i++) {
            Leave::create([
                'user_id' => 2,
                'date' => new DateTime()
            ]);
        }
    }
}
