<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

// ====================================

class Subject extends Model
{
    use HasFactory;

    protected $table = 'subjects';

    protected $fillable = [
        'name',
        'abbr',
    ];

    // ------------------------------
    // ### Scopes ###
    // ------------------------------

    // ------------------------------
    // ### Relationships ###
    // ------------------------------

    public function grades(): BelongsToMany
    {
        return $this->belongsToMany(Grade::class);
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class)
            ->wherePivot('academic_year_id', AcademicYear::IsActive()->id);
    }
}
