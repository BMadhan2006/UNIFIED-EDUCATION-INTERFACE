package com.unifiededucation.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Admission;
import com.unifiededucation.backend.repository.AdmissionRepository;

@Service
public class AdmissionService {

    @Autowired
    private AdmissionRepository admissionRepository;

    public List<Admission> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    public Admission saveAdmission(Admission admission) {
        admission.setStatus("Pending");
        return admissionRepository.save(admission);
    }

    public Admission updateAdmission(Long id, Admission admission) {
        admission.setId(id);
        return admissionRepository.save(admission);
    }

    public void deleteAdmission(Long id) {
        admissionRepository.deleteById(id);
    }

    public Admission approveAdmission(Long id) {
        Admission admission = admissionRepository.findById(id).orElse(null);

        if (admission != null) {
            admission.setStatus("Approved");
            return admissionRepository.save(admission);
        }

        return null;
    }

    public Admission rejectAdmission(Long id) {
        Admission admission = admissionRepository.findById(id).orElse(null);

        if (admission != null) {
            admission.setStatus("Rejected");
            return admissionRepository.save(admission);
        }

        return null;
    }
}