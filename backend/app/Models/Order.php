<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        "total_price",
        "status",
        "payment_method",
        "full_name",
        "phone",
        "governorate",
        "street",
    ];

    // Order.php
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')->withPivot(['quantity']);
    }
}
