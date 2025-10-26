<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix("users")->group(function () {
    Route::post("register", [UserController::class, "register"]);
    Route::post("login", [UserController::class, "login"]);

    // Route::get("index", [UserController::class, "index"]);
    // Route::get("show/{id}", [UserController::class, "show"]);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get("me", [UserController::class, "me"]);
        Route::post("logout", [UserController::class, "logout"]);
        Route::put("update", [UserController::class, "update"]);
    });
});
// صح

Route::middleware('auth:sanctum')->prefix("cart")->group(function () {
    Route::get("index", [CartController::class, "index"]);
    Route::post("store/{id}", [CartController::class, "store"]);
    Route::put("update/{id}", [CartController::class, "update"]);
    Route::delete("destroy/{id}", [CartController::class, "destroy"]);
});
// صح

Route::middleware('auth:sanctum')->prefix("orders")->group(function () {
    Route::get("index", [OrderController::class, "index"]);
    Route::post("store", [OrderController::class, "store"]);


    //admin
    Route::middleware("admin")->group(function () {
        Route::get("allOrders", [OrderController::class, "allOrders"]);
        Route::delete("destroy/{id}", [OrderController::class, "destroy"]);
        Route::put("update/{id}", [OrderController::class, "update"]);
    });
});


Route::prefix("product")->group(function () {
    Route::get("index", [ProductController::class, "index"]);
    Route::get("show/{id}", [ProductController::class, "show"]);


    // admin
    Route::middleware("auth:sanctum")->group(function () {
        Route::middleware("admin")->group(function () {
            Route::post("store", [ProductController::class, "store"]);
            Route::put("update/{id}", [ProductController::class, "update"]);
            Route::delete("destroy/{id}", [ProductController::class, "destroy"]);
        });
    });
});

// صح 