<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

// ====================================

class Quarter extends Model
{
    use HasFactory;

    protected $table = 'quarters';

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'academic_year_id',
    ];

    protected $casts = [
        'start_date' => 'datetime:Y-m-d',
        'end_date' => 'datetime:Y-m-d',
    ];

    // ------------------------------
    // ### Relationships ###
    // ------------------------------

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

}
