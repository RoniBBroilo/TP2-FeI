<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use App\Models\Psicologo;
use App\Models\User;
use Illuminate\Http\Request;

class PerfilController extends Controller
{
    /**
     * Muestra los datos del usuario autenticado, ya sea paciente o psicólogo.
     */
    public function show(Request $request)
    {
        $user = $request->user(); // Obtén el usuario autenticado

        if ($user) {
            $roles = $user->getRoleNames(); // Obtén los roles del usuario

            // Verifica si el usuario tiene roles
            if ($roles->isNotEmpty()) {
                $firstRole = $roles->first(); // Obtiene el primer rol

                if ($firstRole === 'paciente') {
                    // Si es paciente, busca en la tabla 'paciente'
                    $paciente = Paciente::where('email', $user->email)->first();
                    if ($paciente) {
                        return response()->json([
                            'nombre' => $paciente->nombre,
                            'apellido' => $paciente->apellido,
                            'email' => $paciente->email,
                            'dni' => $paciente->dni,
                            'rol' => $firstRole // Devuelve solo el primer rol
                        ]);
                    } else {
                        return response()->json(['error' => 'Paciente no encontrado'], 404);
                    }
                } elseif ($firstRole === 'psicologo') {
                    // Si es psicólogo, busca en la tabla 'psicologo'
                    $psicologo = Psicologo::where('email', $user->email)->first();
                    if ($psicologo) {
                        return response()->json([
                            'nombre' => $psicologo->nombre,
                            'apellido' => $psicologo->apellido,
                            'email' => $psicologo->email,
                            'matricula' => $psicologo->matricula,
                            'telefono' => $psicologo->telefono,
                            'promedio' => $psicologo->promedio,
                            'codigo_postal' => $psicologo->codigo_postal,
                            'id_tematica' => $psicologo->id_tematica,
                            'id_patologia' => $psicologo->id_patologia,
                            'id_corriente' => $psicologo->id_corriente,
                            'rol' => $firstRole // Devuelve solo el primer rol
                        ]);
                    } else {
                        return response()->json(['error' => 'Psicólogo no encontrado'], 404);
                    }
                } else {
                    return response()->json(['error' => 'Rol no reconocido'], 403);
                }
            } else {
                return response()->json(['error' => 'Usuario no tiene roles asignados'], 403);
            }
        } else {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
    }

    public function update(Request $request)
    {
        // Validar el tipo de usuario antes de realizar la actualización
        $roles = $request->user()->getRoleNames(); // Obtener los roles del usuario autenticado

        if ($roles->contains('paciente')) {
            // Validar los datos del paciente
            $request->validate([
                'email' => 'required|email|max:255', // Asegúrate de que el email sea válido
                'nombre' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'dni' => 'required|integer',
            ]);

            // Buscar el paciente en la base de datos usando el email o dni
            $user = Paciente::where('email', $request->email)->orWhere('dni', $request->dni)->first();

            if (!$user) {
                return response()->json(['message' => 'Paciente no encontrado.'], 404);
            }

            // Actualizar los datos del paciente
            $user->update([
                'nombre' => $request->input('nombre'),
                'apellido' => $request->input('apellido'),
                'dni' => $request->input('dni'),
                'email' => $request->input('email'),  // Actualiza también el email
            ]);

            return response()->json(['message' => 'Perfil del paciente actualizado con éxito.'], 201);
        } elseif ($roles->contains('psicologo')) {
            // Validar los datos del psicólogo
            $request->validate([
                'matricula' => 'required|integer',
                'nombre' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'telefono' => 'required|string|max:20',
                'promedio' => 'required|numeric|between:0,10',
                'codigo_postal' => 'required|integer',
                'id_tematica' => 'required|integer',
                'id_patologia' => 'required|integer',
                'id_corriente' => 'required|integer',
                'email' => 'required|email'
            ]);

            // Buscar el psicólogo en la base de datos
            $user = Psicologo::where('email', $request->email)->orWhere('matricula', $request->matricula)->first();

            if (!$user) {
                return response()->json(['message' => 'Psicólogo no encontrado.'], 404);
            }

            // Actualizar los datos del psicólogo
            $user->update($request->only([
                'nombre',
                'apellido',
                'telefono',
                'promedio',
                'codigo_postal',
                'id_tematica',
                'id_patologia',
                'id_corriente',
                'email'
            ]));

            return response()->json(['message' => 'Perfil del psicólogo actualizado con éxito.'], 201);
        } else {
            return response()->json(['message' => 'Rol no autorizado para esta acción.'], 403);
        }
    }
}
