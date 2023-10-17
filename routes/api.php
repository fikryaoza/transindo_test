<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->name('login');
    Route::get('login', function() {
        return response()->json(['code' => 401, 'message' => 'Unauthorized.'], 401);
    });
    Route::post('refresh', 'refresh');
    Route::post('logout', 'logout');
    Route::post('register', 'register');
});


Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [AuthController::class,'logout']);
    // Route::post('refresh', [AuthController::class,'refresh']);
    Route::get('user', [UserController::class,'index']);
    // Route::post('me', [AuthController::class,'me']);
    Route::get('category', [CategoryController::class,'getAll']);
    Route::get('category/{id}', [CategoryController::class,'getById']);
    Route::post('category/{id}', [CategoryController::class,'update']);
    Route::post('category', [CategoryController::class,'create']);
    Route::post('transaction', [TransactionController::class,'store']);
    Route::post('transaction/{id}', [TransactionController::class,'update']);
    Route::get('transaction', [TransactionController::class,'index']);
    Route::get('transaction/{id}', [TransactionController::class,'show']);
});