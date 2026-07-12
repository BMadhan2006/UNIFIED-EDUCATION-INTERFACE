package com.unifiededucation.backend.controller;

import java.util.List;

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

import com.unifiededucation.backend.model.Admission;
import com.unifiededucation.backend.service.AdmissionService;

@RestController
@RequestMapping("/api/admissions")
@CrossOrigin(origins = "http://localhost:5173")
public class AdmissionController {

    @Autowired
    private AdmissionService admissionService;

    @GetMapping
    public List<Admission> getAllAdmissions() {
        return admissionService.getAllAdmissions();
    }

    @PostMapping
    public Admission saveAdmission(@RequestBody Admission admission) {
        return admissionService.saveAdmission(admission);
    }

    @PutMapping("/{id}")
    public Admission updateAdmission(@PathVariable Long id,
                                     @RequestBody Admission admission) {
        return admissionService.updateAdmission(id, admission);
    }

    @DeleteMapping("/{id}")
    public void deleteAdmission(@PathVariable Long id) {
        admissionService.deleteAdmission(id);
    }

    @PutMapping("/{id}/approve")
    public Admission approveAdmission(@PathVariable Long id) {
        return admissionService.approveAdmission(id);
    }

    @PutMapping("/{id}/reject")
    public Admission rejectAdmission(@PathVariable Long id) {
        return admissionService.rejectAdmission(id);
    }
}