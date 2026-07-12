package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unifiededucation.backend.model.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

}