<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
