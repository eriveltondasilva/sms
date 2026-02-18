<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\OnlyNumbers;
use App\Enums\EnrollmentStatus;
use App\Enums\Gender;
use App\Enums\StudentStatus;
use App\Models\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Str;

final class Student extends Model
{
    use BelongsToSchool;
    use HasFactory;

    protected $table = 'students';

    protected $fillable = [
        'full_name',
        'social_name',

        'registration',

        'gender',
        'birth_date',
        'birth_place',

        'rg',
        'cpf',
        'phone',
        'email',
        'address',

        'sus_card',
        'blood_type',
        'health_conditions',
        'allergies',

        'status',
        'status_notes',
    ];

    protected $casts = [
        'birth_date' => 'date:Y-m-d',

        'gender' => Gender::class,
        'status' => StudentStatus::class,
        'cpf'    => OnlyNumbers::class,
        'rg'     => OnlyNumbers::class,
    ];

    // * Relationships
    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return MorphOne<User, $this> */
    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'profile');
    }

    /** @return BelongsToMany<Guardian, $this> */
    public function guardians(): BelongsToMany
    {
        return $this->belongsToMany(Guardian::class, 'student_guardian')
            ->withPivot('relationship', 'is_primary')
            ->withTimestamps();
    }

    public function primaryGuardian()
    {
        return $this->guardians()->wherePivot('is_primary', true)->first();
    }

    /** @return HasMany<Enrollment, $this> */
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    /** @return HasMany<Enrollment, $this> */
    public function activeEnrollments(): HasMany
    {
        return $this->enrollments()->where('status', EnrollmentStatus::ACTIVE);
    }

    // * Scopes
    #[Scope]
    protected function active(Builder $query): void
    {
        $query->where('status', StudentStatus::ACTIVE);
    }

    // * Accessors
    protected function age(): Attribute
    {
        return Attribute::get(fn () => $this->birth_date?->age);
    }

    protected function displayName(): Attribute
    {
        return Attribute::get(fn () => $this->social_name ?? $this->full_name);
    }

    // * Business methods
    public function activate(): void
    {
        $this->update([
            'status'       => StudentStatus::ACTIVE,
            'status_notes' => null,
        ]);
    }

    public function updateStatus(StudentStatus $status, string $reason): void
    {
        $this->update([
            'status'       => $status,
            'status_notes' => $reason,
        ]);
    }

    protected static function booted(): void
    {
        self::creating(function (Student $student): void {
            $student->public_id = (string) Str::uuid();
            // $student->registration = $student->school->code . '-' . str_pad($student->id, 6, '0', STR_PAD_LEFT);
        });
    }
}
