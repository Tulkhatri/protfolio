<?php

use App\Http\Controllers\SkillController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/user/list', [UserController::class, 'getUser']);
Route::get('/user' ,function () {
    return "hello world";
});
Route::post('/user',function(){
    return response()->json("post api data");
});


Route::post('/login', [UserController::class, 'loginUser']);

Route::group(['middleware'=>'auth.api'], function(){

    Route::post('/storeSkill', [SkillController::class, 'store']);
    Route::get('/getSkill', [SkillController::class, 'getList']);
    Route::any('/deleteSkill', [SkillController::class, 'delete']);
    Route::any('/getSingleSkill', [SkillController::class, 'getData']);


});
