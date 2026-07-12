package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unifiededucation.backend.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

}