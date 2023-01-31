<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
        \App\Models\User::create([
            'email' => 'admin@gmail.com',
            'first_name' => 'Admin',
            'last_name' => 'Account',
            'password' => Hash::make('password'),
            'birthday' => new DateTime(),
            'gender' => 'male',
            'address' => 'test address',
            'phone' => 'phone',
            'is_admin' => 1
        ]);
        $testacc = \App\Models\User::create([
            'email' => 'test@gmail.com',
            'first_name' => 'Test',
            'last_name' => 'Account',
            'password' => Hash::make('password'),
            'birthday' => new DateTime(),
            'gender' => 'male',
            'address' => 'test address',
            'phone' => 'phone',
        ]);
        \App\Models\User::factory(100)->create();
    }
}
