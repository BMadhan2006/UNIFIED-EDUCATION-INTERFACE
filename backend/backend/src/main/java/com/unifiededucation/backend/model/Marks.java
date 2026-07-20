package com.unifiededucation.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "marks")
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marksId;
    private String studentId;
    private String studentName;
    private String courseCode;
    private String courseName;
    private Integer internalMarks;
    private Integer externalMarks;
    private Integer totalMarks;
    private String grade;

    public Marks() {
    }

    public Marks(Long id, String marksId, String studentId, String studentName,
                 String courseCode, String courseName, Integer internalMarks,
                 Integer externalMarks, Integer totalMarks, String grade) {
        this.id = id;
        this.marksId = marksId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.internalMarks = internalMarks;
        this.externalMarks = externalMarks;
        this.totalMarks = totalMarks;
        this.grade = grade;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMarksId() { return marksId; }
    public void setMarksId(String marksId) { this.marksId = marksId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public Integer getInternalMarks() { return internalMarks; }
    public void setInternalMarks(Integer internalMarks) { this.internalMarks = internalMarks; }

    public Integer getExternalMarks() { return externalMarks; }
    public void setExternalMarks(Integer externalMarks) { this.externalMarks = externalMarks; }

    public Integer getTotalMarks() { return totalMarks; }
    public void setTotalMarks(Integer totalMarks) { this.totalMarks = totalMarks; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
}