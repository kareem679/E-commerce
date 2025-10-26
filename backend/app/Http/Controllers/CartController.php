<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartStoreRequest;
use App\Http\Requests\CartUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            $cart = $user->cart;
            if (!$cart) {
                return response()->json(["status" => "failed", "message" => "Cart not found"], 404);
            }

            $existingProducts = $cart->products;

            $total = $existingProducts->sum(function ($product) {
                $quantity = $product->pivot->quantity;
                return $product->price * $quantity;
            });

            return response()->json(["message" => "success", "cart" => $existingProducts, "total" => $total], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }
    public function store(CartStoreRequest $request, $id)
    {
        try {
            $user = Auth::user();
            $cart = $user->cart ?: $user->cart()->create();
            $existingProduct = $cart->products()->where("product_id", $id)->first();

            if ($existingProduct) {
                $cart->products()->updateExistingPivot($id, [
                    "quantity" => $existingProduct->pivot->quantity + $request->input("quantity", 1)
                ]);
            } else {
                $cart->products()->attach($id, ["quantity" => $request->input("quantity", 1)]);
            }
            return response()->json(["status" => "success", "message" => "Store successfuly", "cart" => $cart->load('products')], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }

    public function update(CartUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();
            $user = Auth::user();
            $cart = $user->cart;

            if (!$cart) {
                return response()->json(["status" => "failed", "message" => "Cart not found"], 404);
            }

            $existingProduct = $cart->products()->where('product_id', $id)->first();

            if (!$existingProduct) {
                return response()->json(["status" => "failed", "message" => "Product not found in cart"], 404);
            }

            $change = $validatedData["quantity"];
            $oldQuantity = $existingProduct->pivot->quantity;
            $newQuantity = $oldQuantity + $change;


            if ($newQuantity <= 0) {
                $cart->products()->detach($id);
                return response()->json([
                    "status" => "success",
                    "message" => "Product removed from cart"
                ], 200);
            }


            $cart->products()->updateExistingPivot($id, ['quantity' => $newQuantity]);

            return response()->json([
                "status" => "success",
                "message" => "Cart item updated successfully",
                "product" => $cart->products()->where('product_id', $id)->first()
            ], 200);
        } catch (\Exception $error) {
            return response()->json([
                "status" => "failed",
                "message" => "something went wrong",
                "details" => $error->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = Auth::user();
            $cart = $user->cart;
            if (!$cart) {
                return response()->json(["status" => "failed", "message" => "cart not found"], 404);
            }
            $existingProduct = $cart->products()->where("product_id", $id)->first();

            if (!$existingProduct) {
                return response()->json(["status" => "failed", "message" => "Product not found in cart"], 404);
            }

            $cart->products()->detach($id);

            return response()->json([
                "status" => "success",
                'message' => 'Product removed from cart successfully',
                'cart' => $cart->load('products'),
            ], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }
}
