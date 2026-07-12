package com.unifiededucation.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Examination;
import com.unifiededucation.backend.repository.ExaminationRepository;

@Service
public class ExaminationService {

    @Autowired
    private ExaminationRepository examinationRepository;

    public Examination saveExamination(Examination examination) {
        return examinationRepository.save(examination);
    }

    public List<Examination> getAllExaminations() {
        return examinationRepository.findAll();
    }

    public Optional<Examination> getExaminationById(Long id) {
        return examinationRepository.findById(id);
    }

    public Examination updateExamination(Examination examination) {
        return examinationRepository.save(examination);
    }

    public void deleteExamination(Long id) {
        examinationRepository.deleteById(id);
    }
}