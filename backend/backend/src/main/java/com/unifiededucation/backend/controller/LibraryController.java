package com.unifiededucation.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unifiededucation.backend.model.Library;
import com.unifiededucation.backend.service.LibraryService;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "*")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping
    public Library createLibrary(@RequestBody Library library) {
        return libraryService.saveLibrary(library);
    }

    @GetMapping
    public List<Library> getAllLibraries() {
        return libraryService.getAllLibraries();
    }

    @GetMapping("/{id}")
    public Optional<Library> getLibraryById(@PathVariable Long id) {
        return libraryService.getLibraryById(id);
    }

    @PutMapping("/{id}")
    public Library updateLibrary(@PathVariable Long id,
                                 @RequestBody Library library) {
        library.setId(id);
        return libraryService.updateLibrary(library);
    }

    @DeleteMapping("/{id}")
    public String deleteLibrary(@PathVariable Long id) {
        libraryService.deleteLibrary(id);
        return "Book deleted successfully!";
    }
}