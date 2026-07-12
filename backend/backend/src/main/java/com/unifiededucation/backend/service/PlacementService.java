package com.unifiededucation.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unifiededucation.backend.model.Placement;
import com.unifiededucation.backend.repository.PlacementRepository;

@Service
public class PlacementService {

    private final PlacementRepository repository;

    public PlacementService(PlacementRepository repository) {
        this.repository = repository;
    }

    public List<Placement> getAllPlacements() {
        return repository.findAll();
    }

    public Placement addPlacement(Placement placement) {
        return repository.save(placement);
    }

    public Placement updatePlacement(Long id, Placement placement) {
        placement.setId(id);
        return repository.save(placement);
    }

    public void deletePlacement(Long id) {
        repository.deleteById(id);
    }
}