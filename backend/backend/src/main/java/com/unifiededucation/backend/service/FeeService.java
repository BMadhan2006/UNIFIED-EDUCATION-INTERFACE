package com.unifiededucation.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Fee;
import com.unifiededucation.backend.repository.FeeRepository;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    public Fee saveFee(Fee fee) {
        return feeRepository.save(fee);
    }

    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }

    public Optional<Fee> getFeeById(Long id) {
        return feeRepository.findById(id);
    }

    public Fee updateFee(Fee fee) {
        return feeRepository.save(fee);
    }

    public void deleteFee(Long id) {
        feeRepository.deleteById(id);
    }
}