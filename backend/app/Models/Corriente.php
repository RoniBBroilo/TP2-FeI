<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Corriente extends Model
{
    // La tabla asociada al modelo
    protected $table = 'corriente';

    // Los atributos que se pueden asignar de forma masiva
    protected $fillable = ['nombre'];

    // Desactiva las marcas de tiempo si no se usan
    public $timestamps = false;
}
