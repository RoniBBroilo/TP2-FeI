<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Localidad extends Model
{
    // La tabla asociada al modelo
    protected $table = 'localidad';

    // Los atributos que se pueden asignar de forma masiva
    protected $fillable = ['codigo_postal', 'nombre'];

    // Desactiva las marcas de tiempo si no se usan
    public $timestamps = false;
}
