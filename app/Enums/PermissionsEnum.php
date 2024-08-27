<?php

namespace App\Enums;

use App\Traits\EnumHelperTrait;

enum PermissionsEnum: string
{
    use EnumHelperTrait;

    case USERS_VIEW   = 'users.view';    // Visualizar usuários
    case USERS_CREATE = 'users.create';  // Criar usuários
    case USERS_EDIT   = 'users.edit';    // Editar usuários
    case USERS_DELETE = 'users.delete';  // Excluir usuários
    //
    case STUDENTS_INDEX  = 'students.index';   // Listar alunos
    case STUDENTS_VIEW   = 'students.view';    // Visualizar alunos
    case STUDENTS_CREATE = 'students.create';  // Criar alunos
    case STUDENTS_EDIT   = 'students.edit';    // Editar alunos
    case STUDENTS_DELETE = 'students.delete';  // Excluir alunos
    //
    case TEACHERS_INDEX  = 'teachers.index';   // Listar professores
    case TEACHERS_VIEW   = 'teachers.view';    // Visualizar professores
    case TEACHERS_CREATE = 'teachers.create';  // Criar professores
    case TEACHERS_EDIT   = 'teachers.edit';    // Editar professores
    case TEACHERS_DELETE = 'teachers.delete';  // Excluir professores

    public function label(): string
    {
        return match($this) {
            self::USERS_VIEW   => 'visualizar usuários',
            self::USERS_CREATE => 'criar usuários',
            self::USERS_EDIT   => 'editar usuários',
            self::USERS_DELETE => 'excluir usuários',
            //
            self::STUDENTS_INDEX  => 'listar alunos',
            self::STUDENTS_VIEW   => 'visualizar alunos',
            self::STUDENTS_CREATE => 'criar alunos',
            self::STUDENTS_EDIT   => 'editar alunos',
            self::STUDENTS_DELETE => 'excluir alunos',
            //
            self::TEACHERS_INDEX  => 'listar professores',
            self::TEACHERS_VIEW   => 'visualizar professores',
            self::TEACHERS_CREATE => 'criar professores',
            self::TEACHERS_EDIT   => 'editar professores',
            self::TEACHERS_DELETE => 'excluir professores',
        };
    }
};
