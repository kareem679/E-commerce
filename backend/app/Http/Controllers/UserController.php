<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $validatedUser = $request->validated();
            $validatedUser["password"] = Hash::make($validatedUser["password"]);

            $user = User::create($validatedUser);

            $user_token = $user->createToken("user_token")->plainTextToken;

            return response()->json(["user_token"=>$user_token,"user" => $user->only(["id", "name", "email"]), "message" => "register successfully"], 201);
        } catch (\Exception $error) {
            return response()->json(["message" => "server error", "details" => $error->getMessage()], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $validatedUser = $request->validated();
            $user = User::where("email", $validatedUser["email"])->first();
            if (!$user || !Hash::check($validatedUser["password"], $user->password)) {
                return response()->json(["message" => "email or password is wrong"], 401);
            }


            $user_token = $user->createToken("user_token")->plainTextToken;
            return response()->json(["user_token"=>$user_token,"user" => $user->only(["id", "name", "email"]), "message" => "Login successfuly"], 200);
        } catch (\Exception $error) {
            return response()->json(["message" => "server error", "details" => $error->getMessage()], 500);
        }
    }

    public function logout()
    {
        try {
            $user = Auth::user();

            $user?->currentAccessToken()->delete();
            $forgetCookie = cookie()->forget("user_token");

            return response()->noContent()->withCookie($forgetCookie);
        } catch (\Exception $error) {
            return response()->json(["message" => "server error", "details" => $error->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $users = User::select("id", "name", "email")->get();
            return response()->json($users, 200);
        } catch (\Exception $error) {
            return response()->json(["message" => "server error", "details" => $error], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user, 200);
        } catch (ModelNotFoundException $ex) {
            return response()->json(["message" => "User not found"], 404);
        } catch (\Exception $error) {
            return response()->json(["message" => "server error", "details" => $error->getMessage()], 500);
        }
    }
    public function update(UpdateRequest $request)
    {
        try {
            $user = Auth::user();
            $validatedData = $request->validated();
            $updateduser = $user->update($validatedData);
            return response()->json(["user" => $updateduser], 200);
        } catch (\Exception $error) {
            return response()->json(["message" => "server error", "details" => $error->getMessage()], 500);
        }
    }

    public function me(){
        try{
            $user = Auth::user();
            return response()->json(["message"=>"success", "user"=>$user->only("name", "email", "id","roles")], 200);
        }catch(\Exception $error){
            return response()->json(["message" => "server error", "details" => $error->getMessage()], 500);
        }
    }
}
