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

import com.unifiededucation.backend.model.Examination;
import com.unifiededucation.backend.service.ExaminationService;

@RestController
@RequestMapping("/api/examinations")
@CrossOrigin(origins = "*")
public class ExaminationController {

    @Autowired
    private ExaminationService examinationService;

    @PostMapping
    public Examination createExamination(@RequestBody Examination examination) {
        return examinationService.saveExamination(examination);
    }

    @GetMapping
    public List<Examination> getAllExaminations() {
        return examinationService.getAllExaminations();
    }

    @GetMapping("/{id}")
    public Optional<Examination> getExaminationById(@PathVariable Long id) {
        return examinationService.getExaminationById(id);
    }

    @PutMapping("/{id}")
    public Examination updateExamination(@PathVariable Long id,
                                         @RequestBody Examination examination) {
        examination.setId(id);
        return examinationService.updateExamination(examination);
    }

    @DeleteMapping("/{id}")
    public String deleteExamination(@PathVariable Long id) {
        examinationService.deleteExamination(id);
        return "Examination deleted successfully!";
    }
}