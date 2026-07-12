package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unifiededucation.backend.model.Admission;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {

}