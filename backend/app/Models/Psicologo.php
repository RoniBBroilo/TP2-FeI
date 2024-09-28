<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Psicologo extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable, HasRoles;

    protected $table = 'psicologo';
    protected $guard_name = 'web';

    protected $primaryKey = 'matricula';  // Definir 'matricula' como clave primaria
    public $incrementing = false;
    protected $fillable = [
        'matricula',
        'nombre',
        'apellido',
        'telefono',
        'promedio',
        'codigo_postal',
        'id_tematica',
        'id_patologia',
        'id_corriente',
        'email',
        'password',
    ];
    public function setNombreAttribute($value)
    {
        $this->attributes['nombre'] = ucfirst(strtolower($value));
    }

    public function setApellidoAttribute($value)
    {
        $this->attributes['apellido'] = ucfirst(strtolower($value));
    }

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function localidad()
    {
        return $this->belongsTo(Localidad::class, 'codigo_postal', 'codigo_postal');
    }

    public function tematica()
    {
        return $this->belongsTo(Tematica::class, 'id_tematica', 'id_tematica');
    }

    public function patologia()
    {
        return $this->belongsTo(Patologia::class, 'id_patologia', 'id_patologia');
    }

    public function corriente()
    {
        return $this->belongsTo(Corriente::class, 'id_corriente', 'id_corriente');
    }

    public function roles()
    {
        return $this->belongsToMany(\Spatie\Permission\Models\Role::class, 'model_has_roles', 'model_id', 'role_id');
    }
}
