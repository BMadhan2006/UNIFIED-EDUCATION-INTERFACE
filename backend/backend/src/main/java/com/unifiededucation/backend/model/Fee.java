package com.unifiededucation.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "fees")
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String feeId;
    private String studentId;
    private String studentName;
    private String department;
    private Integer semester;
    private Double totalFee;
    private Double paidAmount;
    private Double balanceAmount;
    private String paymentStatus;

    public Fee() {
    }

    public Fee(Long id, String feeId, String studentId, String studentName,
               String department, Integer semester,
               Double totalFee, Double paidAmount,
               Double balanceAmount, String paymentStatus) {
        this.id = id;
        this.feeId = feeId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.department = department;
        this.semester = semester;
        this.totalFee = totalFee;
        this.paidAmount = paidAmount;
        this.balanceAmount = balanceAmount;
        this.paymentStatus = paymentStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeeId() {
        return feeId;
    }

    public void setFeeId(String feeId) {
        this.feeId = feeId;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Double getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(Double totalFee) {
        this.totalFee = totalFee;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public Double getBalanceAmount() {
        return balanceAmount;
    }

    public void setBalanceAmount(Double balanceAmount) {
        this.balanceAmount = balanceAmount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}