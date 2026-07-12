package com.unifiededucation.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unifiededucation.backend.model.Placement;
import com.unifiededucation.backend.service.PlacementService;

@RestController
@RequestMapping("/api/placements")
@CrossOrigin(origins = "*")
public class PlacementController {

    private final PlacementService service;

    public PlacementController(PlacementService service) {
        this.service = service;
    }

    @GetMapping
    public List<Placement> getAllPlacements() {
        return service.getAllPlacements();
    }

    @PostMapping
    public Placement addPlacement(@RequestBody Placement placement) {
        return service.addPlacement(placement);
    }

    @PutMapping("/{id}")
    public Placement updatePlacement(
            @PathVariable Long id,
            @RequestBody Placement placement) {
        return service.updatePlacement(id, placement);
    }

    @DeleteMapping("/{id}")
    public void deletePlacement(@PathVariable Long id) {
        service.deletePlacement(id);
    }
}