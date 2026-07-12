package com.unifiededucation.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "examinations")
public class Examination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examId;
    private String examName;
    private String courseCode;
    private String courseName;
    private String examDate;
    private String examTime;
    private String examHall;
    private Integer semester;
    private String department;

    public Examination() {
    }

    public Examination(Long id, String examId, String examName,
                       String courseCode, String courseName,
                       String examDate, String examTime,
                       String examHall, Integer semester,
                       String department) {
        this.id = id;
        this.examId = examId;
        this.examName = examName;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.examDate = examDate;
        this.examTime = examTime;
        this.examHall = examHall;
        this.semester = semester;
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
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

    public String getExamDate() {
        return examDate;
    }

    public void setExamDate(String examDate) {
        this.examDate = examDate;
    }

    public String getExamTime() {
        return examTime;
    }

    public void setExamTime(String examTime) {
        this.examTime = examTime;
    }

    public String getExamHall() {
        return examHall;
    }

    public void setExamHall(String examHall) {
        this.examHall = examHall;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}