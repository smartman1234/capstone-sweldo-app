<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payslip extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_hours',
        'earnings',
        'deduction_list',
        'net_pay',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
