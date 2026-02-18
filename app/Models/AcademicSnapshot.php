<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Traits\BelongsToSchool;
use App\Models\Traits\BelongsToSchoolYear;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class AcademicSnapshot extends Model
{
    use BelongsToSchool;
    use BelongsToSchoolYear;
    use HasFactory;

    protected $table = 'academic_snapshots';

    protected $fillable = [
        'enrollment_id',
        'student_name',
        'classroom_name',
        'data',
        'is_outdated',
        'generated_at',
    ];

    /**
     * Os atributos que devem ser convertidos (casted).
     */
    protected $casts = [
        'data'         => AsCollection::class,
        'is_outdated'  => 'boolean',
        'generated_at' => 'datetime',
    ];

    /**
     * @return BelongsTo<Enrollment, $this>
     */
    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }
}
