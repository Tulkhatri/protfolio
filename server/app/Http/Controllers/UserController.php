<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;


class UserController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function getUser(){
        $user=User::get();
        return json_encode($user);
    }
}

