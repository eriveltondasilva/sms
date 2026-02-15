<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use App\Models\Scopes\HasActiveScope;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

final class User extends Authenticatable
{
    use HasActiveScope;

    /** @use HasFactory<UserFactory> */
    use HasFactory;
    use HasRoles;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'school_id',
        'profile_type',
        'profile_id',

        'name',
        'email',
        'password',
        'avatar',

        'is_active',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at'       => 'datetime',
            'password'                => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_active'               => 'boolean',
            'last_login_at'           => 'datetime',
        ];
    }

    // region Relationships
    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return MorphTo<Model, $this> */
    public function profile(): MorphTo
    {
        return $this->morphTo();
    }

    /** @return HasMany<Assessment, $this> */
    public function createdAssessments(): HasMany
    {
        return $this->hasMany(Assessment::class, 'created_by');
    }

    /** @return HasMany<StudentScore, $this> */
    public function recordedScores(): HasMany
    {
        return $this->hasMany(StudentScore::class, 'created_by');
    }

    /** @return HasMany<Attendance, $this> */
    public function recordedAttendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'recorded_by');
    }

    /** @return HasMany<LessonRecord, $this> */
    public function recordedLessons(): HasMany
    {
        return $this->hasMany(LessonRecord::class, 'recorded_by');
    }

    /** @return HasMany<LessonPlan, $this> */
    public function createdLessonPlans(): HasMany
    {
        return $this->hasMany(LessonPlan::class, 'created_by');
    }

    /** @return HasMany<LessonPlan, $this> */
    public function approvedLessonPlans(): HasMany
    {
        return $this->hasMany(LessonPlan::class, 'approved_by');
    }
    // endregion

    // region Scopes
    #[Scope]
    protected function forSchool(Builder $query, int $schoolId): void
    {
        $query->where('school_id', $schoolId);
    }
    // endregion

    // region Business Methods
    public function isSuperAdmin(): bool
    {
        return $this->hasRole(UserRole::SUPER_ADMIN);
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(UserRole::ADMIN);
    }

    public function isCoordinator(): bool
    {
        return $this->hasRole(UserRole::COORDINATOR);
    }

    public function isTeacher(): bool
    {
        return $this->hasRole(UserRole::TEACHER);
    }
    // endregion

}
