<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('psicologo_corriente', function (Blueprint $table) {
            $table->id('id_psicologo_corriente');
            $table->integer('matricula_psicologo');
            $table->unsignedBigInteger('id_corriente');

            $table->foreign('matricula_psicologo')->references('matricula')->on('psicologo');
            $table->foreign('id_corriente')->references('id_corriente')->on('corriente');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('psicologo_corriente');
    }
};
