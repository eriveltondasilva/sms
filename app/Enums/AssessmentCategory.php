<?php

declare(strict_types=1);

namespace App\Enums;

enum AssessmentCategory: string
{
    // Avaliação normal: prova, trabalho, participação
    case REGULAR = 'regular';

    // Prova substitutiva: aluno faltou com justificativa válida
    // Substitui a avaliação perdida 1:1, sem penalização
    case MAKEUP = 'makeup';

    // Recuperação de período/bimestre: aluno tirou abaixo do mínimo
    // Aplica a RecoveryMethod configurada no school_year_config
    case PERIOD_RECOVERY = 'period_recovery';

    // Exame final: aluno reprovado por nota no ano, mas com frequência OK
    // Aplica a annual_recovery_method do school_year_config
    case FINAL_EXAM = 'final_exam';

    public const DEFAULT = self::REGULAR->value;

    public function label(): string
    {
        return match ($this) {
            self::REGULAR         => 'Avaliação Regular',
            self::MAKEUP          => 'Prova Substitutiva',
            self::PERIOD_RECOVERY => 'Recuperação de Período',
            self::FINAL_EXAM      => 'Exame Final',
        };
    }

    public function isRecovery(): bool
    {
        return in_array($this, [self::PERIOD_RECOVERY, self::FINAL_EXAM], true);
    }

    public function countsForPeriodGrade(): bool
    {
        return in_array($this, [self::REGULAR, self::MAKEUP], true);
    }
}
