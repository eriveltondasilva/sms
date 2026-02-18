<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\OnlyNumbers;
use App\Models\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

final class Guardian extends Model
{
    use BelongsToSchool;
    use HasFactory;

    protected $table = 'guardians';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'cpf',
        'address',
    ];

    protected $casts = [
        'cpf' => OnlyNumbers::class,
    ];

    // * Relationships
    /** @return BelongsToMany<Student, $this> */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'student_guardian')
            ->withPivot('relationship', 'is_primary')
            ->withTimestamps();
    }

    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    #[Scope]
    protected function forStudent(Builder $query, int $studentId): void
    {
        $query->whereHas('students', fn (Builder $q) => $q->where('students.id', $studentId));
    }
}
