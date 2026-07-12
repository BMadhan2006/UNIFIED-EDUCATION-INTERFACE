package com.unifiededucation.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Timetable;
import com.unifiededucation.backend.repository.TimetableRepository;

@Service
public class TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;

    public Timetable saveTimetable(Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    public List<Timetable> getAllTimetables() {
        return timetableRepository.findAll();
    }

    public Optional<Timetable> getTimetableById(Long id) {
        return timetableRepository.findById(id);
    }

    public Timetable updateTimetable(Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    public void deleteTimetable(Long id) {
        timetableRepository.deleteById(id);
    }
}