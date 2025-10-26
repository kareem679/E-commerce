<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $products = [
            [
                "title" => "product_1",
                "description" => "product_1 is a lowest product quality",
                "price" => 34,
                "image" => "/images/product_1.jpg"
            ],
            [
                "title" => "product_2",
                "description" => "product_2 is a lowest product quality",
                "price" => 34,
                "image" => "/images/product_2.jpg"
            ],
            [
                "title" => "product_3",
                "description" => "product_3 is a lowest product quality",
                "price" => 34,
                "image" => "/images/product_3.jpg"
            ],
            [
                "title" => "product_4",
                "description" => "product_4 is a lowest product quality",
                "price" => 332,
                "image" => "/images/product_4.jpg"
            ],
            [
                "title" => "product_5",
                "description" => "product_5 is a lowest product quality",
                "price" => 3412,
                "image" => "/images/product_5.jpg"
            ],
            [
                "title" => "product_1",
                "description" => "product_1 is a lowest product quality",
                "price" => 34212,
                "image" => "/images/product_1.jpg"
            ],
            [
                "title" => "product_2",
                "description" => "product_2 is a lowest product quality",
                "price" => 344512,
                "image" => "/images/product_2.jpg"
            ],
            [
                "title" => "product_3",
                "description" => "product_3 is a lowest product quality",
                "price" => 512,
                "image" => "/images/product_3.jpg"
            ],
        ];

        foreach($products as $product){
            Product::create($product);
        }
    }
}
