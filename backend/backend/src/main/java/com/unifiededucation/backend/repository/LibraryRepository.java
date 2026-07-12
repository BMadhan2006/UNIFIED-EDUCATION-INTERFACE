package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unifiededucation.backend.model.Library;

public interface LibraryRepository extends JpaRepository<Library, Long> {

}