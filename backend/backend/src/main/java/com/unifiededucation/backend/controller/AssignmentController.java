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

import com.unifiededucation.backend.model.Assignment;
import com.unifiededucation.backend.service.AssignmentService;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentService.saveAssignment(assignment);
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/{id}")
    public Optional<Assignment> getAssignmentById(@PathVariable Long id) {
        return assignmentService.getAssignmentById(id);
    }

    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id,
                                       @RequestBody Assignment assignment) {
        assignment.setId(id);
        return assignmentService.updateAssignment(assignment);
    }

    @DeleteMapping("/{id}")
    public String deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return "Assignment deleted successfully!";
    }
}