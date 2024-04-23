package com.coder.springjwt.payload.response;

public class EmployeeResponse {
    private Long id;
    private String fullName; // Change to fullName
    private String designation;
    private double salary;
    private String createdBy; // Add createdBy field

    public EmployeeResponse() {
    }

    public EmployeeResponse(Long id, String fullName, String designation, double salary, String createdBy) {
        this.id = id;
        this.fullName = fullName;
        this.designation = designation;
        this.salary = salary;
        this.createdBy = createdBy; // Set createdBy in constructor
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
