package com.unifiededucation.backend.controller;

import java.util.List;

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

import com.unifiededucation.backend.model.Student;
import com.unifiededucation.backend.repository.StudentRepository;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // Add Student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // Get All Students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // Update Student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setStudentId(updatedStudent.getStudentId());
        student.setFullName(updatedStudent.getFullName());
        student.setEmail(updatedStudent.getEmail());
        student.setPhone(updatedStudent.getPhone());
        student.setDepartment(updatedStudent.getDepartment());
        student.setYear(updatedStudent.getYear());
        student.setSemester(updatedStudent.getSemester());
        student.setAddress(updatedStudent.getAddress());

        return studentRepository.save(student);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentRepository.delete(student);

        return "Student deleted successfully";
    }
}