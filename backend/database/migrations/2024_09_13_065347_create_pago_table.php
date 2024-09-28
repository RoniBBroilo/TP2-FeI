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
        Schema::create('pago', function (Blueprint $table) {
            $table->id('nro_transaccion');
            $table->integer('dni_paciente');
            $table->integer('matricula_psicologo');
            $table->date('fecha');
            $table->time('hora');
            $table->float('valor');
            $table->foreign('dni_paciente')->references('dni')->on('paciente');
            $table->foreign('matricula_psicologo')->references('matricula')->on('psicologo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pago');
    }
};