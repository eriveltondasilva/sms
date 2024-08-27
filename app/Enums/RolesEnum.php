<?php

namespace App\Enums;

use App\Traits\EnumHelperTrait;

enum RolesEnum: string
{
    use EnumHelperTrait;

    case ADMIN   = 'admin';    // administrador(a)
    case TEACHER = 'teacher';  // professor(a)
    case STUDENT = 'student';  // estudante
    case USER    = 'user';     // usuário(a)

    public const DEFAULT = self::USER;

    public function label(): string
    {
        return match($this) {
            self::ADMIN   => 'administrador(a)',
            self::TEACHER => 'professor(a)',
            self::STUDENT => 'estudante',
            self::USER    => 'usuário',
            default       => $this->value,
        };
    }
};
