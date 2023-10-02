<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Auth\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\SaveRequest;
use App\Http\Resources\UserResourse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function register(SaveRequest $request)
    {
        $data = $request->validated();
        $user = User::where('user', $data['user'])->first();
        if ($user) {
            return response()->json([
                'message' => 'Usuário já cadastrado!'
            ], 401);
        }
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        $auth = new AuthController();
        $token = $auth->login($request);

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }
}
