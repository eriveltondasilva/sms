<?php

namespace App\Enums;

enum SubjectEnum: string
{
    case PORTUGUESE  = 'português';
    case MATHEMATICS = 'matemática';
    case HISTORY     = 'história';
    case GEOGRAPHY   = 'geografia';
    case ARTS        = 'artes';

    /* Gera a abreviação para o valor fornecido. */
    public function abbr(): string
    {
        $abbrMap = match($this) {
            static::PORTUGUESE  => 'LPO',
            static::MATHEMATICS => 'MAT',
            static::HISTORY     => 'HIST',
            static::GEOGRAPHY   => 'GEO',
            static::ARTS        => 'ART',
        };

        return $abbrMap;
    }
}
