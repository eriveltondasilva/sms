<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN   = 'admin';    // administrador(a)
    case TEACHER = 'teacher';  // professor(a)
    case STUDENT = 'student';  // estudante
    case USER    = 'user';     // usuário(a)

    public const DEFAULT = self::USER;

    /* Retorna um rótulo com base no papel do usuário. */
    public function label(): string
    {
        $labelMap = match($this) {
            static::ADMIN   => 'Administrador(a)',
            static::TEACHER => 'Professor(a)',
            static::STUDENT => 'Estudante',
            static::USER    => 'Usuário',
            default         => 'Indefinido',
        };

        return $labelMap;
    }
};
