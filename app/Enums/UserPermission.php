<?php

declare(strict_types=1);

namespace App\Enums;

enum UserPermission: string
{
    // Students
    case STUDENTS_VIEW = 'students.view';
    case STUDENTS_CREATE = 'students.create';
    case STUDENTS_UPDATE = 'students.update';
    case STUDENTS_DELETE = 'students.delete';
    case STUDENTS_MANAGE_GUARDIANS = 'students.manage_guardians';

    // Teachers
    case TEACHERS_VIEW = 'teachers.view';
    case TEACHERS_CREATE = 'teachers.create';
    case TEACHERS_UPDATE = 'teachers.update';
    case TEACHERS_DELETE = 'teachers.delete';

    // Classes
    case CLASSES_VIEW = 'classrooms.view';
    case CLASSES_CREATE = 'classrooms.create';
    case CLASSES_UPDATE = 'classrooms.update';
    case CLASSES_DELETE = 'classrooms.delete';
    case CLASSES_MANAGE_STUDENTS = 'classrooms.manage_students';
    case CLASSES_MANAGE_SCHEDULE = 'classrooms.manage_schedule';

    // Subjects
    case SUBJECTS_VIEW = 'subjects.view';
    case SUBJECTS_CREATE = 'subjects.create';
    case SUBJECTS_UPDATE = 'subjects.update';
    case SUBJECTS_DELETE = 'subjects.delete';

    // School Years
    case SCHOOL_YEARS_VIEW = 'school_years.view';
    case SCHOOL_YEARS_CREATE = 'school_years.create';
    case SCHOOL_YEARS_UPDATE = 'school_years.update';
    case SCHOOL_YEARS_PUBLISH = 'school_years.publish';
    case SCHOOL_YEARS_CLOSE = 'school_years.close';

    // Academic Periods
    case ACADEMIC_PERIODS_VIEW = 'academic_periods.view';
    case ACADEMIC_PERIODS_CREATE = 'academic_periods.create';
    case ACADEMIC_PERIODS_UPDATE = 'academic_periods.update';
    case ACADEMIC_PERIODS_DELETE = 'academic_periods.delete';
    case ACADEMIC_PERIODS_CLOSE = 'academic_periods.close';

    // Teaching Assignments
    case TEACHING_ASSIGNMENTS_VIEW = 'teaching_assignments.view';
    case TEACHING_ASSIGNMENTS_CREATE = 'teaching_assignments.create';
    case TEACHING_ASSIGNMENTS_UPDATE = 'teaching_assignments.update';
    case TEACHING_ASSIGNMENTS_DELETE = 'teaching_assignments.delete';

    // Class Schedules
    case CLASS_SCHEDULES_VIEW = 'class_schedules.view';
    case CLASS_SCHEDULES_CREATE = 'class_schedules.create';
    case CLASS_SCHEDULES_UPDATE = 'class_schedules.update';
    case CLASS_SCHEDULES_DELETE = 'class_schedules.delete';

    // Lesson Plans
    case LESSON_PLANS_VIEW = 'lesson_plans.view';
    case LESSON_PLANS_CREATE = 'lesson_plans.create';
    case LESSON_PLANS_UPDATE = 'lesson_plans.update';
    case LESSON_PLANS_DELETE = 'lesson_plans.delete';
    case LESSON_PLANS_APPROVE = 'lesson_plans.approve';

    // Lesson Records
    case LESSON_RECORDS_VIEW = 'lesson_records.view';
    case LESSON_RECORDS_CREATE = 'lesson_records.create';
    case LESSON_RECORDS_UPDATE = 'lesson_records.update';
    case LESSON_RECORDS_DELETE = 'lesson_records.delete';

    // Enrollments
    case ENROLLMENTS_VIEW = 'enrollments.view';
    case ENROLLMENTS_CREATE = 'enrollments.create';
    case ENROLLMENTS_TRANSFER = 'enrollments.transfer';
    case ENROLLMENTS_DROPOUT = 'enrollments.dropout';
    case ENROLLMENTS_FINALIZE = 'enrollments.finalize';

    // Assessments
    case ASSESSMENTS_VIEW = 'assessments.view';
    case ASSESSMENTS_CREATE = 'assessments.create';
    case ASSESSMENTS_UPDATE = 'assessments.update';
    case ASSESSMENTS_DELETE = 'assessments.delete';

    // Assessment Types
    case ASSESSMENT_TYPES_VIEW = 'assessment_types.view';
    case ASSESSMENT_TYPES_CREATE = 'assessment_types.create';
    case ASSESSMENT_TYPES_UPDATE = 'assessment_types.update';
    case ASSESSMENT_TYPES_DELETE = 'assessment_types.delete';

    // Grades
    case GRADES_VIEW = 'grades.view';
    case GRADES_CREATE = 'grades.create';
    case GRADES_UPDATE = 'grades.update';
    case GRADES_DELETE = 'grades.delete';

    // Attendances
    case ATTENDANCES_VIEW = 'attendances.view';
    case ATTENDANCES_CREATE = 'attendances.create';
    case ATTENDANCES_UPDATE = 'attendances.update';

    // Recoveries
    case RECOVERIES_VIEW = 'recoveries.view';
    case RECOVERIES_CREATE = 'recoveries.create';

    // Academic Histories
    case ACADEMIC_HISTORIES_VIEW = 'academic_histories.view';
    case ACADEMIC_HISTORIES_GENERATE = 'academic_histories.generate';

    // School Events
    case SCHOOL_EVENTS_VIEW = 'school_events.view';
    case SCHOOL_EVENTS_CREATE = 'school_events.create';
    case SCHOOL_EVENTS_UPDATE = 'school_events.update';
    case SCHOOL_EVENTS_DELETE = 'school_events.delete';

    // Reports
    case REPORTS_CLASS = 'reports.class';
    case REPORTS_STUDENT = 'reports.student';
    case REPORTS_ATTENDANCE = 'reports.attendance';
    case REPORTS_GRADE = 'reports.grade';
    case REPORTS_TEACHER = 'reports.teacher';
    case REPORTS_SCHOOL = 'reports.school';

    // Admin (Super Admin only)
    case ADMIN_SCHOOLS_MANAGE = 'admin.schools.manage';
    case ADMIN_USERS_MANAGE = 'admin.users.manage';
    case ADMIN_ROLES_MANAGE = 'admin.roles.manage';
    case ADMIN_PERMISSIONS_MANAGE = 'admin.permissions.manage';
}
