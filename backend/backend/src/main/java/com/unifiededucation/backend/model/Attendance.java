package com.unifiededucation.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String attendanceId;
    private String studentId;
    private String studentName;
    private String courseCode;
    private String courseName;
    private String attendanceDate;
    private String status;

    public Attendance() {
    }

    public Attendance(Long id, String attendanceId, String studentId,
                      String studentName, String courseCode,
                      String courseName, String attendanceDate,
                      String status) {
        this.id = id;
        this.attendanceId = attendanceId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.attendanceDate = attendanceDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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