package com.etour.main.controller;

import com.etour.main.models.TourMaster;
import com.etour.main.service.Category.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tourMaster")
@CrossOrigin
public class TourMasterController {

    private final TourMasterService tourMasterService;

    @Autowired
    public TourMasterController(TourMasterService tourMasterService) {
        this.tourMasterService = tourMasterService;
    }

    // Get all TourMaster records
    @GetMapping
    public ResponseEntity<List<TourMaster>> getAllTourMasters() {
        List<TourMaster> tourMasters = tourMasterService.findAll();
        return ResponseEntity.ok(tourMasters);
    }

    // Get a specific TourMaster record by ID
    @GetMapping("/{id}")
    public ResponseEntity<TourMaster> getTourMasterById(@PathVariable Integer id) {
        Optional<TourMaster> tourMaster = tourMasterService.findById(id);
        return tourMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("tours/{categoryId}")
	public List<TourMaster> getAllTours(@PathVariable int categoryId) {
		return tourMasterService.getTourByCategoryId(categoryId);
	}

    // Create a new TourMaster record
    @PostMapping
    public ResponseEntity<TourMaster> createTourMaster(@RequestBody TourMaster tourMaster) {
        TourMaster savedTourMaster = tourMasterService.save(tourMaster);
        return ResponseEntity.ok(savedTourMaster);
    }
}

    // Update an existing TourMaster record by ID
