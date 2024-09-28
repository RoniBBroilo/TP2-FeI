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
        Schema::create('paciente', function (Blueprint $table) {
            $table->integer('dni')->primary();
            $table->string('nombre', 50);
            $table->string('apellido', 50);
            $table->string('preferencias')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('paciente');
    }
};
