package com.coder.springjwt.repository;

import com.coder.springjwt.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> 
{
    List<Employee> findByCreatedBy(String createdBy);
}
