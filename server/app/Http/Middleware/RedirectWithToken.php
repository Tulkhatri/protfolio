<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
class RedirectWithToken
{
        /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = 'api')
    {
    try {
        if (!Auth::guard('api')->user())
            throw new Exception ('Invalid API token.', 1);

        $payload = Auth::payload();
        $userId = $payload->get('sub');
        if (!$userId)
            throw new Exception ('Invalid API request. You are not logged in yet.', 1);


        // Set the sanitized input data back to the request
        $request->merge([
            'userid' => $userId,
        ]);

    } catch (Exception  $e) {
        return response()->json([
            'type' => 'error',
            'message' => $e->getMessage(),
            'response' => 'false',
            'status' => 401
        ]);
    }
    return $next($request);
}

}
