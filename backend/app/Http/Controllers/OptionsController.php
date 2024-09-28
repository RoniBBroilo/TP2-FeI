<?php

namespace App\Http\Controllers;

use App\Models\Tematica;
use App\Models\Patologia;
use App\Models\Corriente;
use App\Models\Localidad;

class OptionsController extends Controller
{
    // Método para obtener todas las temáticas
    public function getTematicas()
    {
        $tematicas = Tematica::all();
        return response()->json($tematicas);
    }

    // Método para obtener todas las patologías
    public function getPatologias()
    {
        $patologias = Patologia::all();
        return response()->json($patologias);
    }

    // Método para obtener todas las corrientes
    public function getCorrientes()
    {
        $corrientes = Corriente::all();
        return response()->json($corrientes);
    }

    // Método para obtener todas las localidades
    public function getLocalidades()
    {
        $localidades = Localidad::all();
        return response()->json($localidades);
    }
}
