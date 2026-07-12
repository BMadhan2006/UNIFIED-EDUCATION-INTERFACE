package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unifiededucation.backend.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}