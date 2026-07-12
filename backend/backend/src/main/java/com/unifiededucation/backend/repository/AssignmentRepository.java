package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unifiededucation.backend.model.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

}