<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;


    public function getUser(){
        $user=User::get();
        return json_encode($user);
    }
    public function loginUser(Request $request ){
    
        // $user_data = [
        //     'email'  => $request->email,
        //     'password' => $request->password
        // ];
      
        //    if(Auth::attempt($user_data))
        $post = $request->all();
        $credentials = [
            'email' => $post['email'],
            'password' => $post['password'],
        ];


        // $token=Auth::attempt($request->all());
        $token = Auth::attempt($credentials);

        if(Auth::attempt($request->all()))//same as above comment section

           {
            return json_encode([
                'message'=>'login success',
                'status'=>'200',
                'response'=>[
                    'token'=>$token
                ]
            ]);
           }
           else
           {
            return json_encode(['message'=>"login Failed",'status'=>'401']);
           }
    }
}