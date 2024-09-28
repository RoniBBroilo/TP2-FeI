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
        Schema::create('psicologo_patologia', function (Blueprint $table) {
            $table->id('id_psicologo_patologia');
            $table->integer('matricula_psicolgo');
            $table->unsignedBigInteger('id_patologia');

            $table->foreign('matricula_psicolgo')->references('matricula')->on('psicologo');
            $table->foreign('id_patologia')->references('id_patologia')->on('patologia');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('psicologo_patologia');
    }
};
