<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class LocalidadTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Realiza la solicitud a la API
        $response = Http::get('https://apis.datos.gob.ar/georef/api/localidades?provincia=Neuquén&campos=id,nombre&max=1000');

        // Verifica que la solicitud fue exitosa
        if ($response->successful()) {
            $localidades = $response->json()['localidades'];

            // Inserta los datos en la tabla `localidad`
            foreach ($localidades as $localidad) {
                DB::table('localidad')->insert([
                    'codigo_postal' => $localidad['id'],    // Guardar el 'id' de la localidad como codigo_postal
                    'nombre' => $localidad['nombre'],        // Guardar el nombre de la localidad
                    'created_at' => now(),                   // Timestamp actual para 'created_at'
                    'updated_at' => now(),                   // Timestamp actual para 'updated_at'
                ]);
            }
        } else {
            // Manejo de error en caso de que la solicitud falle
            $this->command->error('Error al obtener las localidades de la API.');
        }
    }
}
