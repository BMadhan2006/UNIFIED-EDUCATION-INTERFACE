package com.unifiededucation.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Teacher;
import com.unifiededucation.backend.repository.TeacherRepository;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Optional<Teacher> getTeacherById(Long id) {
        return teacherRepository.findById(id);
    }

    public Teacher updateTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }
}