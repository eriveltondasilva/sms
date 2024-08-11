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
        'school_year_id',
    ];

    // ------------------------------
    // ### Scopes ###
    // ------------------------------

    // public function scopeActiveSchoolYear($query)
    // {
    //     return;
    // }

    // ------------------------------
    // ### Relationships ###
    // ------------------------------

    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
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
