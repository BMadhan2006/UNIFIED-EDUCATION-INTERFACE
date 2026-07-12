package com.unifiededucation.backend.dto;

public class AdminDTO {

    private String adminId;
    private String fullName;
    private String email;
    private String phone;
    private String designation;

    public AdminDTO() {
    }

    public AdminDTO(String adminId, String fullName, String email,
                    String phone, String designation) {
        this.adminId = adminId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.designation = designation;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
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

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}