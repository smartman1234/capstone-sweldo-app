<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Attendance;
use App\Models\Deduction;
use App\Models\Department;
use App\Models\Job;
use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;
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

        // Admin
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

        // Test
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

        // Create attendance for test account
        $testUser = User::find(2);

        // Create attendance for january (5 hours)
        $testUser->attendances()->create([
            'clock_in' => Carbon::parse('2023-01-01 09:00:00'),
            'clock_out' => Carbon::parse('2023-01-01 14:00:00'),
        ]);

        // Create attendance for feb (8 hours)
        $testUser->attendances()->create([
            'clock_in' => Carbon::parse('2023-02-01 09:00:00'),
            'clock_out' => Carbon::parse('2023-02-01 17:00:00'),
        ]);
        // Create attendance for feb (8 hours)
        $testUser->attendances()->create([
            'clock_in' => Carbon::parse('2023-02-02 09:00:00'),
            'clock_out' => Carbon::parse('2023-02-02 17:00:00'),
        ]);

        User::factory(20)->create();

        // Leaves
        for ($i = 0; $i <= 30; $i++) {
            Leave::create([
                'user_id' => 2,
                'date' => new DateTime()
            ]);
        }
    }
}
