<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // Permissões para operações de usuário
    case USERS_VIEW   = 'users.view';    // Visualizar usuários
    case USERS_CREATE = 'users.create';  // Criar usuários
    case USERS_EDIT   = 'users.edit';    // Editar usuários
    case USERS_DELETE = 'users.delete';  // Excluir usuários

    // Permissões para operações de aluno
    case STUDENTS_INDEX  = 'students.index';   // Listar alunos
    case STUDENTS_VIEW   = 'students.view';    // Visualizar alunos
    case STUDENTS_CREATE = 'students.create';  // Criar alunos
    case STUDENTS_EDIT   = 'students.edit';    // Editar alunos
    case STUDENTS_DELETE = 'students.delete';  // Excluir alunos

    // Permissões para operações de professor
    case TEACHERS_INDEX  = 'teachers.index';   // Listar professores
    case TEACHERS_VIEW   = 'teachers.view';    // Visualizar professores
    case TEACHERS_CREATE = 'teachers.create';  // Criar professores
    case TEACHERS_EDIT   = 'teachers.edit';    // Editar professores
    case TEACHERS_DELETE = 'teachers.delete';  // Excluir professores

    /* Retorna um rótulo baseado no papel do usuário. */
    public function label(): string
    {
        $labelMap = match($this) {
            static::USERS_VIEW   => 'Visualizar usuários',
            static::USERS_CREATE => 'Criar usuários',
            static::USERS_EDIT   => 'Editar usuários',
            static::USERS_DELETE => 'Excluir usuários',

            static::STUDENTS_INDEX  => 'Listar alunos',
            static::STUDENTS_VIEW   => 'Visualizar alunos',
            static::STUDENTS_CREATE => 'Criar alunos',
            static::STUDENTS_EDIT   => 'Editar alunos',
            static::STUDENTS_DELETE => 'Excluir alunos',

            static::TEACHERS_INDEX  => 'Listar professores',
            static::TEACHERS_VIEW   => 'Visualizar professores',
            static::TEACHERS_CREATE => 'Criar professores',
            static::TEACHERS_EDIT   => 'Editar professores',
            static::TEACHERS_DELETE => 'Excluir professores',
        };

        return $labelMap;
    }
};
