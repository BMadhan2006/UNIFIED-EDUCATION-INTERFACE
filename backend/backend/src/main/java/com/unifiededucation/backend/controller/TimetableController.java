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

import com.unifiededucation.backend.model.Timetable;
import com.unifiededucation.backend.service.TimetableService;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "*")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @PostMapping
    public Timetable createTimetable(@RequestBody Timetable timetable) {
        return timetableService.saveTimetable(timetable);
    }

    @GetMapping
    public List<Timetable> getAllTimetables() {
        return timetableService.getAllTimetables();
    }

    @GetMapping("/{id}")
    public Optional<Timetable> getTimetableById(@PathVariable Long id) {
        return timetableService.getTimetableById(id);
    }

    @PutMapping("/{id}")
    public Timetable updateTimetable(@PathVariable Long id,
                                     @RequestBody Timetable timetable) {
        timetable.setId(id);
        return timetableService.updateTimetable(timetable);
    }

    @DeleteMapping("/{id}")
    public String deleteTimetable(@PathVariable Long id) {
        timetableService.deleteTimetable(id);
        return "Timetable deleted successfully!";
    }
}