<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::all();

            if (count($products) === 0) {
                return response()->json([
                    "status" => "failed",
                    "message" => "Products not found"
                ], 404);
            }

            return response()->json([
                "status" => "success",
                "message" => "All products",
                "products" => $products
            ], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json(["status" => "failed", "message" => "Product not found"], 404);
            }

            return response()->json([
                "status" => "success",
                "product" => $product
            ], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }

    // admin
    public function update(ProductUpdateRequest $request, $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json(["status" => "failed", "message" => "Product not found"], 404);
            }

            $validated = $request->validated();

            if ($request->hasFile('image')) {

                if (file_exists(public_path($product->image))) {
                    unlink(public_path($product->image));
                }

                $image = $request->file('image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $validated['image'] = '/images/' . $imageName;
            }

            $product->update($validated);

            return response()->json([
                "status" => "success",
                "message" => "Product updated successfully",
                "product" => $product->fresh()
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
            $product = Product::find($id);

            if (!$product) {
                return response()->json(["status" => "failed", "message" => "Product not found"], 404);
            }


            if (file_exists(public_path($product->image))) {
                unlink(public_path($product->image));
            }

            $product->delete();

            return response()->json([
                "status" => "success",
                "message" => "Product deleted successfully"
            ], 200);
        } catch (\Exception $error) {
            return response()->json(["status" => "failed", "message" => "something went wrong", "details" => $error->getMessage()], 500);
        }
    }
    public function store(ProductStoreRequest $request)
    {
        try {
            $validated = $request->validated();


            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $validated['image'] = '/images/' . $imageName;
            }

            $product = Product::create($validated);

            return response()->json([
                "status" => "success",
                "message" => "Product created successfully",
                "product" => $product
            ], 201);
        } catch (\Exception $error) {
            return response()->json([
                "status" => "failed",
                "message" => "something went wrong",
                "details" => $error->getMessage()
            ], 500);
        }
    }
}
