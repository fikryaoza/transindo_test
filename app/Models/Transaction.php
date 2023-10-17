<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;
     protected $fillable = [
        'category_id',
        'quantity',
        'price',
        'subtotal',
        'status',
        'created_by'
    ];

    public function categories(): HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

     public function users(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }
}
