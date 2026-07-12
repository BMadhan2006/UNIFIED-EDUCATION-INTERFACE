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

import com.unifiededucation.backend.model.Fee;
import com.unifiededucation.backend.service.FeeService;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "*")
public class FeeController {

    @Autowired
    private FeeService feeService;

    @PostMapping
    public Fee createFee(@RequestBody Fee fee) {
        return feeService.saveFee(fee);
    }

    @GetMapping
    public List<Fee> getAllFees() {
        return feeService.getAllFees();
    }

    @GetMapping("/{id}")
    public Optional<Fee> getFeeById(@PathVariable Long id) {
        return feeService.getFeeById(id);
    }

    @PutMapping("/{id}")
    public Fee updateFee(@PathVariable Long id,
                         @RequestBody Fee fee) {
        fee.setId(id);
        return feeService.updateFee(fee);
    }

    @DeleteMapping("/{id}")
    public String deleteFee(@PathVariable Long id) {
        feeService.deleteFee(id);
        return "Fee deleted successfully!";
    }
}