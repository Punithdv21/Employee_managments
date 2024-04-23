package com.coder.springjwt.payload.request;

public class EmployeeRequest {
    private String firstName;
    private String lastName;
    private String designation;
    private double salary;

    // Constructors
    public EmployeeRequest() {
    }

    public EmployeeRequest(String firstName, String lastName, String designation, double salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.designation = designation;
        this.salary = salary;
    }

    // Getters and setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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
}
