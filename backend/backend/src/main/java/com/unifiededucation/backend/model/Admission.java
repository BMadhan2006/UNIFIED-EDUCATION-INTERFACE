package com.unifiededucation.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admissions")
public class Admission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private String course;
    private String address;

    private Double tenthPercentage;
    private Double twelfthPercentage;
    private String tenthMarksheet;
private String twelfthMarksheet;
private String photo;
    private String status;

    public Admission() {
    }

    public Admission(String fullName,
                     String email,
                     String phone,
                     String course,
                     String address,
                     Double tenthPercentage,
                     Double twelfthPercentage,
                     String status) {

        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.course = course;
        this.address = address;
        this.tenthPercentage = tenthPercentage;
        this.twelfthPercentage = twelfthPercentage;
        this.status = status;
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Full Name
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // Email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Course
    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    // Address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
public Double getTenthPercentage() {
    return tenthPercentage;
}

public void setTenthPercentage(Double tenthPercentage) {
    this.tenthPercentage = tenthPercentage;
}

public Double getTwelfthPercentage() {
    return twelfthPercentage;
}

public void setTwelfthPercentage(Double twelfthPercentage) {
    this.twelfthPercentage = twelfthPercentage;
}
public String getTenthMarksheet() {
    return tenthMarksheet;
}

public void setTenthMarksheet(String tenthMarksheet) {
    this.tenthMarksheet = tenthMarksheet;
}

public String getTwelfthMarksheet() {
    return twelfthMarksheet;
}

public void setTwelfthMarksheet(String twelfthMarksheet) {
    this.twelfthMarksheet = twelfthMarksheet;
}

public String getPhoto() {
    return photo;
}

public void setPhoto(String photo) {
    this.photo = photo;
}
    // Status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}