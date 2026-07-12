package com.unifiededucation.backend.dto;

public class DashboardResponse {

    private long students;
    private long teachers;
    private long courses;
    private long enrollments;
    private long attendance;
    private long marks;
    private long notifications;

    public DashboardResponse() {}

    public DashboardResponse(long students, long teachers, long courses,
                             long enrollments, long attendance,
                             long marks, long notifications) {
        this.students = students;
        this.teachers = teachers;
        this.courses = courses;
        this.enrollments = enrollments;
        this.attendance = attendance;
        this.marks = marks;
        this.notifications = notifications;
    }

    public long getStudents() { return students; }
    public void setStudents(long students) { this.students = students; }

    public long getTeachers() { return teachers; }
    public void setTeachers(long teachers) { this.teachers = teachers; }

    public long getCourses() { return courses; }
    public void setCourses(long courses) { this.courses = courses; }

    public long getEnrollments() { return enrollments; }
    public void setEnrollments(long enrollments) { this.enrollments = enrollments; }

    public long getAttendance() { return attendance; }
    public void setAttendance(long attendance) { this.attendance = attendance; }

    public long getMarks() { return marks; }
    public void setMarks(long marks) { this.marks = marks; }

    public long getNotifications() { return notifications; }
    public void setNotifications(long notifications) { this.notifications = notifications; }
}