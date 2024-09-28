<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Llama al seeder de roles
        $this->call([
            CorrienteTableSeeder::class,
            LocalidadTableSeeder::class,
            PatologiaTableSeeder::class,
            TematicaTableSeeder::class,
            RolesTableSeeder::class
        ]);
    }
}
