package com.unifiededucation.backend.dto;

public class TeacherDTO {

    private String teacherId;
    private String fullName;
    private String email;
    private String phone;
    private String department;
    private String qualification;
    private String specialization;

    public TeacherDTO() {
    }

    public TeacherDTO(String teacherId, String fullName, String email,
                      String phone, String department,
                      String qualification, String specialization) {
        this.teacherId = teacherId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.department = department;
        this.qualification = qualification;
        this.specialization = specialization;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}