package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unifiededucation.backend.model.Examination;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {

}