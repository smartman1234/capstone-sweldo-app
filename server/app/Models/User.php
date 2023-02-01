<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
        'birthday',
        'gender',
        'address',
        'phone',
        'department_id',
        'job_id',
    ];

    protected $hidden = [
        'password',
    ];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function leaves()
    {
        return $this->hasMany(Leave::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
