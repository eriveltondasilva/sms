<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\AttendanceStatus;
use App\Models\Attendance;
use App\Models\Enrollment;
use App\Models\LessonRecord;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Attendance>
 */
final class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement([
            AttendanceStatus::PRESENT,
            AttendanceStatus::PRESENT,
            AttendanceStatus::PRESENT,
            AttendanceStatus::ABSENT,
        ]);

        return [
            'lesson_record_id' => LessonRecord::factory(),
            'enrollment_id'    => Enrollment::factory(),
            'recorded_by'      => null,
            'status'           => $status,
            'justification'    => null,
        ];
    }
}
