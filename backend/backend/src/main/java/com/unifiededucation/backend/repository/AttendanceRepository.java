package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unifiededucation.backend.model.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

}