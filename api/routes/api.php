<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use \App\Http\Controllers\Api\V1\EmpresaController;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "Api" middleware group. Make something great!
|
*/

Route::post(
    '/v1/login/',
    [\App\Http\Controllers\AuthController::class, 'login']
);

Route::post(
    '/v1/register/',
    [UserController::class, 'register']
);

Route::middleware('auth:api')->get(
    '/v1/empresas/',
    [EmpresaController::class, 'showAll']
);

Route::middleware('auth:api')->get(
    '/v1/empresas/{id}',
    [EmpresaController::class, 'show']
);

Route::middleware('auth:api')->post(
    '/v1/empresas/',
    [EmpresaController::class, 'save']
);

Route::middleware('auth:api')->post(
    '/v1/empresas/{id}',
    [EmpresaController::class, 'update']
);

Route::middleware('auth:api')->delete(
    '/v1/empresas/{id}',
    [EmpresaController::class, 'destroy']
);
