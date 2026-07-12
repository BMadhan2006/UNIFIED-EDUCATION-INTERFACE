package com.unifiededucation.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Library;
import com.unifiededucation.backend.repository.LibraryRepository;

@Service
public class LibraryService {

    @Autowired
    private LibraryRepository libraryRepository;

    public Library saveLibrary(Library library) {
        return libraryRepository.save(library);
    }

    public List<Library> getAllLibraries() {
        return libraryRepository.findAll();
    }

    public Optional<Library> getLibraryById(Long id) {
        return libraryRepository.findById(id);
    }

    public Library updateLibrary(Library library) {
        return libraryRepository.save(library);
    }

    public void deleteLibrary(Long id) {
        libraryRepository.deleteById(id);
    }
}