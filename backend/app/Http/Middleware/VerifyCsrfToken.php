<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class VerifyCsrfToken extends Middleware
{
    protected $except = [
        'api/*',  // Excluye todas las rutas API del middleware CSRF
    ];
}
