package com.unifiededucation.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Marks;
import com.unifiededucation.backend.repository.MarksRepository;

@Service
public class MarksService {

    @Autowired
    private MarksRepository marksRepository;

    public Marks saveMarks(Marks marks) {
        return marksRepository.save(marks);
    }

    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    public Optional<Marks> getMarksById(Long id) {
        return marksRepository.findById(id);
    }

    public Marks updateMarks(Marks marks) {
        return marksRepository.save(marks);
    }

    public void deleteMarks(Long id) {
        marksRepository.deleteById(id);
    }
}