<?php

declare(strict_types=1);

namespace App\Enums;

enum UserRole: string
{
    case SUPER_ADMIN = 'super_admin';
    case ADMIN = 'admin';
    case COORDINATOR = 'coordinator';
    case TEACHER = 'teacher';
    // TODO: Add Student
    // case STUDENT = 'student';

    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN       => 'Administrador',
            self::COORDINATOR => 'Coordenador',
            self::TEACHER     => 'Professor',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN       => 'Administrador',
            self::COORDINATOR => 'Coordenador',
            self::TEACHER     => 'Professor',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'bg-red-500',
            self::ADMIN       => 'bg-blue-500',
            self::COORDINATOR => 'bg-green-500',
            self::TEACHER     => 'bg-yellow-500',
        };
    }
}
