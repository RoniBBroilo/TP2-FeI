<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Psicologo;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    public function registerPaciente(Request $request)
    {
        $validated = $request->validate([
            'dni' => 'required|integer|min:8|unique:paciente',
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'preferencias' => 'string|nullable',
            'email' => 'required|string|email|max:255|unique:paciente',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $paciente = Paciente::create([
            'dni' => $validated['dni'],
            'nombre' => $validated['nombre'],
            'apellido' => $validated['apellido'],
            'preferencias' => $validated['preferencias'] ?? null,
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        // Obtener o crear el rol
        $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'paciente', 'guard_name' => 'web']);

        // Asignar el rol al paciente
        DB::table('model_has_roles')->insert([
            'role_id' => $role->id,
            'model_type' => 'App\Models\Paciente',
            'model_id' => $paciente->dni
        ]);

        $paciente->save();

        return response()->json($paciente, 201);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $isPaciente = Paciente::where('email', $data['email'])->exists();
        $isPsicologo = Psicologo::where('email', $data['email'])->exists();

        if ($isPaciente && Auth::guard('paciente')->attempt($data)) {
            $user = Auth::guard('paciente')->user();
            $token = $user->createToken('main')->plainTextToken;

            return response()->json([
                'user' => [
                    'nombre' => $user->nombre,
                    'apellido' => $user->apellido,
                    'email' => $user->email,
                    'dni' => $user->dni
                ],
                'token' => $token
            ]);
        } elseif ($isPsicologo && Auth::guard('psicologo')->attempt($data)) {
            $user = Auth::guard('psicologo')->user();
            $token = $user->createToken('main')->plainTextToken;

            return response()->json([
                'user' => [
                    'nombre' => $user->nombre,
                    'apellido' => $user->apellido,
                    'email' => $user->email,
                    'matricula' => $user->matricula
                ],
                'token' => $token
            ]);
        }

        return response([
            'message' => 'Email o contraseña incorrectos'
        ], 401);
    }

    public function registerPsicologo(Request $request)
    {

        $validatedData = $request->validate([
            'matricula' => 'required|unique:psicologo|integer',
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'telefono' => 'required|string|max:15',
            'promedio' => 'required|numeric|between:0,10',
            'codigo_postal' => 'required|integer',
            'id_tematica' => 'required|integer',
            'id_patologia' => 'required|integer',
            'id_corriente' => 'required|integer',
            'email' => 'required|email|unique:psicologo',
            'password' => 'required|confirmed|min:8',
        ]);

        $psicologo = Psicologo::create([
            'matricula' => $validatedData['matricula'],
            'nombre' => $validatedData['nombre'],
            'apellido' => $validatedData['apellido'],
            'telefono' => $validatedData['telefono'],
            'promedio' => $validatedData['promedio'],
            'codigo_postal' => $validatedData['codigo_postal'],
            'id_tematica' => $validatedData['id_tematica'],
            'id_patologia' => $validatedData['id_patologia'],
            'id_corriente' => $validatedData['id_corriente'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        // Obtener o crear el rol
        $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'psicologo', 'guard_name' => 'web']);

        // Asignar el rol al paciente
        DB::table('model_has_roles')->insert([
            'role_id' => $role->id,
            'model_type' => 'App\Models\Psicologo',  // Tipo de modelo correcto
            'model_id' => $psicologo->matricula             // El ID del psicologo
        ]);
        $psicologo->save();

        return response()->json($psicologo, 201);
    }
}
