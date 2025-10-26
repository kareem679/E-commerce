<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'price',
        'image',
    ];
    public function carts()
    {
        return $this->belongsToMany(Cart::class, "cart_items")->withPivot("quantity");
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')->withPivot(['quantity']);
    }
}
