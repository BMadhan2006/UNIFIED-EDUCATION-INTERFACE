package com.unifiededucation.backend.dto;

public class EnrollmentDTO {

    private String enrollmentId;
    private String studentId;
    private String studentName;
    private String courseCode;
    private String courseName;
    private String enrollmentDate;
    private String status;

    public EnrollmentDTO() {
    }

    public EnrollmentDTO(String enrollmentId, String studentId, String studentName,
                         String courseCode, String courseName,
                         String enrollmentDate, String status) {
        this.enrollmentId = enrollmentId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.enrollmentDate = enrollmentDate;
        this.status = status;
    }

    public String getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(String enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(String enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}