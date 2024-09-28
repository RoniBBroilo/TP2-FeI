<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('calificacion', function (Blueprint $table) {
            $table->id('id_califacion');
            $table->integer('dni_paciente');
            $table->integer('matricula_psicologo');
            $table->float('valor');
            $table->foreign('dni_paciente')->references('dni')->on('paciente')->onDelete('cascade');
            $table->foreign('matricula_psicologo')->references('matricula')->on('psicologo')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calificacion');
    }
};