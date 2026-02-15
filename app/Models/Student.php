<?php

declare(strict_types=1);

namespace App\Models;

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
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
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

    /** @return HasMany<Guardian, $this> */
    public function guardians(): HasMany
    {
        return $this->hasMany(Guardian::class);
    }

    /** @return HasOne<Guardian, $this> */
    public function primaryGuardian(): HasOne
    {
        return $this->hasOne(Guardian::class)->where('is_primary', true);
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

    /** @return HasMany<AcademicHistory, $this> */
    public function academicHistories(): HasMany
    {
        return $this->hasMany(AcademicHistory::class);
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

    protected function cpf(): Attribute
    {
        return Attribute::set(fn ($value): ?string => preg_replace('/\D/', '', (string) $value));
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
