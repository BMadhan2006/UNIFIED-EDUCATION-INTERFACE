package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unifiededucation.backend.model.Timetable;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {

}