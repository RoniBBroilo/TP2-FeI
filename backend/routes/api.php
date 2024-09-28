<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\OptionsController;
use App\Http\Controllers\PerfilController;

Route::get('/tematicas', [OptionsController::class, 'getTematicas']);
Route::get('/patologias', [OptionsController::class, 'getPatologias']);
Route::get('/corrientes', [OptionsController::class, 'getCorrientes']);
Route::get('/localidades', [OptionsController::class, 'getLocalidades']);

Route::post('/registrar_paciente', [AuthController::class, 'registerPaciente']);

Route::post('/register_psicologo', [AuthController::class, 'registerPsicologo']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/perfil', [PerfilController::class, 'show']);
    Route::put('/update-patient', [PerfilController::class, 'update'])->middleware('auth');
});

Route::middleware([
    'auth:sanctum',
    EnsureFrontendRequestsAreStateful::class,
])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
