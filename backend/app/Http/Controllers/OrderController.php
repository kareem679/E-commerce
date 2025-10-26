<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddOrderRequest;
use App\Http\Requests\updateOrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(AddOrderRequest $request)
    {
        $validatedData = $request->validated();

        try {
            $user = Auth::user();
            $cart = $user->cart;

            if (!$cart || $cart->products->isEmpty()) {
                return response()->json(["status" => "failed", "message" => "Cart is empty"], 400);
            }


            $order = $user->orders()->create([
                "full_name" => $validatedData["full_name"],
                "phone" => $validatedData["phone"],
                "governorate" => $validatedData["governorate"],
                "street" => $validatedData["street"],
                "total_price" => $cart->products->sum(function ($product) {
                    return $product->price * $product->pivot->quantity;
                }),
                "status" => "pending",
                "payment_method" => $validatedData["payment_method"],
            ]);


            foreach ($cart->products as $product) {
                $order->products()->attach($product->id, [
                    "quantity" => $product->pivot->quantity
                ]);
            }


            $cart->products()->detach();

            return response()->json([
                "status" => "success",
                "message" => "Order created successfully",
                "order" => $order->load("products")
            ], 201);
        } catch (\Exception $error) {
            return response()->json([
                "status" => "failed",
                "message" => "Something went wrong",
                "details" => $error->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            $user = Auth::user();
            $orders = $user->orders()->with("products")->get();
            if ($orders->isEmpty()) {
                return response()->json(["status" => "failed", "message" => "No orders found"], 404);
            }

            return response()->json(["status" => "success", "orders" => $orders], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }




    //admin
    public function allOrders()
    {
        try {
            $allOrders = Order::with(["user", "products"])->get();
            if ($allOrders->isEmpty()) {
                return response()->json(["status" => "failed", "message" => "No orders found"], 404);
            }
            return response()->json(["status" => "success", "orders" => $allOrders], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json(["status" => "failed", "message" => "Order not found"], 404);
            }

            $order->delete();

            return response()->json(["status" => "success", "message" => "Order deleted successfully"], 200);
        } catch (\Exception $error) {
            return response()->json([
                "status" => "failed",
                "message" => "Something went wrong",
                "details" => $error->getMessage()
            ], 500);
        }
    }
    public function update(updateOrderRequest $request, $id)
    {
        try {
            $validationData = $request->validated();

            $order = Order::find($id);

            if (!$order) {
                return response()->json(["status" => "failed", "message" => "Order not found"], 404);
            }

            $order->update($validationData);

            return response()->json([
                "status" => "success",
                "message" => "Order updated successfully",
                "order" => $order->fresh()
            ], 200);
        } catch (\Exception $error) {
            return response()->json([
                "status" => "failed",
                "message" => "Something went wrong",
                "details" => $error->getMessage()
            ], 500);
        }
    }
}
