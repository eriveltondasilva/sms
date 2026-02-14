<?php

declare(strict_types=1);

namespace App\Enums;

enum Weekday: int
{
    case MONDAY = 1;
    case TUESDAY = 2;
    case WEDNESDAY = 3;
    case THURSDAY = 4;
    case FRIDAY = 5;
    case SATURDAY = 6;
    case SUNDAY = 7;

    public const DEFAULT = self::MONDAY->value;

    public function label(): string
    {
        return match ($this) {
            self::MONDAY    => 'Segunda-feira',
            self::TUESDAY   => 'Terça-feira',
            self::WEDNESDAY => 'Quarta-feira',
            self::THURSDAY  => 'Quinta-feira',
            self::FRIDAY    => 'Sexta-feira',
            self::SATURDAY  => 'Sábado',
            self::SUNDAY    => 'Domingo',
        };
    }

    public function shortLabel(): string
    {
        return match ($this) {
            self::MONDAY    => 'Seg',
            self::TUESDAY   => 'Ter',
            self::WEDNESDAY => 'Qua',
            self::THURSDAY  => 'Qui',
            self::FRIDAY    => 'Sex',
            self::SATURDAY  => 'Sáb',
            self::SUNDAY    => 'Dom',
        };
    }

    public function next(): self
    {
        return self::from($this->value === 7 ? 1 : $this->value + 1);
    }

    public function previous(): self
    {
        return self::from($this->value === 1 ? 7 : $this->value - 1);
    }
}
