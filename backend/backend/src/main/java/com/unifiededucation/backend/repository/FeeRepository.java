package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unifiededucation.backend.model.Fee;

public interface FeeRepository extends JpaRepository<Fee, Long> {

}