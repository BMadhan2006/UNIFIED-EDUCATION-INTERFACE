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

import com.unifiededucation.backend.model.Marks;
import com.unifiededucation.backend.service.MarksService;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "*")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @PostMapping
    public Marks createMarks(@RequestBody Marks marks) {
        return marksService.saveMarks(marks);
    }

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksService.getAllMarks();
    }

    @GetMapping("/{id}")
    public Optional<Marks> getMarksById(@PathVariable Long id) {
        return marksService.getMarksById(id);
    }

    @PutMapping("/{id}")
    public Marks updateMarks(@PathVariable Long id, @RequestBody Marks marks) {
        marks.setId(id);
        return marksService.updateMarks(marks);
    }

    @DeleteMapping("/{id}")
    public String deleteMarks(@PathVariable Long id) {
        marksService.deleteMarks(id);
        return "Marks deleted successfully!";
    }
}