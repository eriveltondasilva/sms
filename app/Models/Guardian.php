<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Guardian extends Model
{
    use HasFactory;

    protected $table = 'guardians';

    protected $fillable = [
        'student_id',

        'name',
        'relationship',

        'phone',
        'email',
        'cpf',

        'address',

        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    // * Relationships
    /** @return BelongsTo<Student, $this> */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    // * Scopes
    #[Scope]
    protected function forStudent(Builder $query, int $studentId): void
    {
        $query->where('student_id', $studentId);
    }

    #[Scope]
    protected function primary(Builder $query): void
    {
        $query->where('is_primary', true);
    }

    protected function cpf(): Attribute
    {
        return Attribute::set(fn ($value): ?string => preg_replace('/\D/', '', (string) $value));
    }
}
