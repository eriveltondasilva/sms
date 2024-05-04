<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsToMany, BelongsTo};

// ====================================
class Group extends Model
{
    use HasFactory;

    protected $table = 'groups';

    protected $fillable = [
        'name',
        'classroom',
        'shift',
        'academic_year_id',
    ];

    // ------------------------------
    // ### Scopes ###
    // ------------------------------

    // public function scopeActiveAcademicYear($query)
    // {
    //     return;
    // }

    // ------------------------------
    // ### Relationships ###
    // ------------------------------

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class);
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class);
    }

}
