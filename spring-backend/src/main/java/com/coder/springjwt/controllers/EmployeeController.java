package com.coder.springjwt.controllers;

import com.coder.springjwt.models.Employee;
import com.coder.springjwt.payload.request.EmployeeRequest;
import com.coder.springjwt.payload.response.EmployeeResponse;
import com.coder.springjwt.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public List<EmployeeResponse> getAllEmployees() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<Employee> employees;

        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            // If the user is an admin, fetch all employees
            employees = employeeRepository.findAll();
        } else {
            // If the user is a regular user, fetch only the employees they created
            String currentUsername = authentication.getName();
            employees = employeeRepository.findByCreatedBy(currentUsername);
        }

        List<EmployeeResponse> employeeResponses = employees.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return employeeResponses;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public EmployeeResponse createEmployee(@RequestBody EmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        employee.setFirstName(employeeRequest.getFirstName());
        employee.setLastName(employeeRequest.getLastName());
        employee.setDesignation(employeeRequest.getDesignation());
        employee.setSalary(employeeRequest.getSalary());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Set the creator username for the employee
        employee.setCreatedBy(currentUsername);

        Employee savedEmployee = employeeRepository.save(employee);
        return mapToResponse(savedEmployee);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public EmployeeResponse getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Check if the current user has permission to view the employee
        if (!employee.getCreatedBy().equals(currentUsername) && !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            throw new RuntimeException("Access denied");
        }

        return mapToResponse(employee);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public EmployeeResponse updateEmployee(@PathVariable Long id, @RequestBody EmployeeRequest employeeRequest) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Check if the current user is the creator of the employee or an admin
        if (!employee.getCreatedBy().equals(currentUsername) && !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            throw new RuntimeException("Access denied");
        }

        employee.setFirstName(employeeRequest.getFirstName());
        employee.setLastName(employeeRequest.getLastName());
        employee.setDesignation(employeeRequest.getDesignation());
        employee.setSalary(employeeRequest.getSalary());

        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToResponse(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public String deleteEmployee(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Check if the current user is the creator of the employee or an admin
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        if (!employee.getCreatedBy().equals(currentUsername) && !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            throw new RuntimeException("Access denied");
        }

        employeeRepository.deleteById(id);
        return "Employee deleted successfully with id: " + id;
    }

    private EmployeeResponse mapToResponse(Employee employee) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        EmployeeResponse response = new EmployeeResponse();
        response.setId(employee.getId());
        response.setFullName(employee.getFirstName() + " " + employee.getLastName());
        response.setDesignation(employee.getDesignation());
        response.setSalary(employee.getSalary());

        // Check if the user is an admin to include the createdBy field
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            response.setCreatedBy(employee.getCreatedBy());
        }

        return response;
    }
}
