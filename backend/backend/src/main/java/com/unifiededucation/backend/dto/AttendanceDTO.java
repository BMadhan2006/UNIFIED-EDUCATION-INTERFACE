package com.unifiededucation.backend.dto;

public class AttendanceDTO {

    private String attendanceId;
    private String studentId;
    private String studentName;
    private String courseCode;
    private String courseName;
    private String attendanceDate;
    private String status;

    public AttendanceDTO() {
    }

    public AttendanceDTO(String attendanceId, String studentId, String studentName,
                         String courseCode, String courseName,
                         String attendanceDate, String status) {
        this.attendanceId = attendanceId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.attendanceDate = attendanceDate;
        this.status = status;
    }

    public String getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(String attendanceId) {
        this.attendanceId = attendanceId;
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

    public String getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(String attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}