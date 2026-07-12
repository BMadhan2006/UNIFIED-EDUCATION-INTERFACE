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

import com.unifiededucation.backend.model.Teacher;
import com.unifiededucation.backend.service.TeacherService;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherService.saveTeacher(teacher);
    }

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public Optional<Teacher> getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }

    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable Long id, @RequestBody Teacher teacher) {
        teacher.setId(id);
        return teacherService.updateTeacher(teacher);
    }

    @DeleteMapping("/{id}")
    public String deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return "Teacher deleted successfully!";
    }
}