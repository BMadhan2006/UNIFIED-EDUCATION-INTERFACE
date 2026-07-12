package com.unifiededucation.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unifiededucation.backend.model.Enrollment;
import com.unifiededucation.backend.service.EnrollmentService;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public Enrollment createEnrollment(@RequestBody Enrollment enrollment) {
        return enrollmentService.saveEnrollment(enrollment);
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/{id}")
    public Optional<Enrollment> getEnrollmentById(@PathVariable Long id) {
        return enrollmentService.getEnrollmentById(id);
    }

    @PutMapping("/{id}")
    public Enrollment updateEnrollment(@PathVariable Long id,
                                       @RequestBody Enrollment enrollment) {
        enrollment.setId(id);
        return enrollmentService.updateEnrollment(enrollment);
    }

    @DeleteMapping("/{id}")
    public String deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
        return "Enrollment deleted successfully!";
    }
}