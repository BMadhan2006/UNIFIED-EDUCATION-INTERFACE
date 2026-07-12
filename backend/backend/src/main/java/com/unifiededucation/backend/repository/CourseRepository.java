package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unifiededucation.backend.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}