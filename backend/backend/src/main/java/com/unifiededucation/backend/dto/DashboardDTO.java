package com.unifiededucation.backend.dto;

public class DashboardDTO {

    private long students;
    private long teachers;
    private long courses;
    private long enrollments;
    private long attendance;
    private long marks;
    private long examinations;
    private long assignments;
    private long fees;
    private long library;
    private long notifications;

    public DashboardDTO() {
    }

    public long getStudents() {
        return students;
    }

    public void setStudents(long students) {
        this.students = students;
    }

    public long getTeachers() {
        return teachers;
    }

    public void setTeachers(long teachers) {
        this.teachers = teachers;
    }

    public long getCourses() {
        return courses;
    }

    public void setCourses(long courses) {
        this.courses = courses;
    }

    public long getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(long enrollments) {
        this.enrollments = enrollments;
    }

    public long getAttendance() {
        return attendance;
    }

    public void setAttendance(long attendance) {
        this.attendance = attendance;
    }

    public long getMarks() {
        return marks;
    }

    public void setMarks(long marks) {
        this.marks = marks;
    }

    public long getExaminations() {
        return examinations;
    }

    public void setExaminations(long examinations) {
        this.examinations = examinations;
    }

    public long getAssignments() {
        return assignments;
    }

    public void setAssignments(long assignments) {
        this.assignments = assignments;
    }

    public long getFees() {
        return fees;
    }

    public void setFees(long fees) {
        this.fees = fees;
    }

    public long getLibrary() {
        return library;
    }

    public void setLibrary(long library) {
        this.library = library;
    }

    public long getNotifications() {
        return notifications;
    }

    public void setNotifications(long notifications) {
        this.notifications = notifications;
    }
}