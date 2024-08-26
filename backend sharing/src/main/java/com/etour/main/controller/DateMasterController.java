package com.etour.main.controller;

import com.etour.main.models.DateMaster;
import com.etour.main.service.Category.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dateMaster")
@CrossOrigin(origins = "*")
public class DateMasterController {

    private final DateMasterService dateMasterService;

    @Autowired
    public DateMasterController(DateMasterService dateMasterService) {
        this.dateMasterService = dateMasterService;
    }

    // Get all DateMaster records
    @GetMapping
    public ResponseEntity<List<DateMaster>> getAllDateMasters() {
        List<DateMaster> dateMasters = dateMasterService.findAll();
        return ResponseEntity.ok(dateMasters);
    }
    @GetMapping("tourdates/{searchDate}")
	public List<DateMaster> getTourDatesBetweenDepartDateAndEndDate(@PathVariable Date startDate) {
		return dateMasterService.findByDepartDateBetween(startDate,startDate);
	}
    @GetMapping("/category/{catmasterId}")
    public List<DateMaster> getDatesByCategoryMasterId(@PathVariable Integer catmasterId) {
        return dateMasterService.getDatesByCategoryMasterId(catmasterId);
    }
    @GetMapping("/by-date-range")
    public List<DateMaster> getDateMastersByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate
    ) {
        return dateMasterService.getDateMastersWithinRange(startDate, endDate);
    }
    // Get a specific DateMaster record by ID
    @GetMapping("/{id}")
    public ResponseEntity<DateMaster> getDateMasterById(@PathVariable Integer id) {
        Optional<DateMaster> dateMaster = dateMasterService.findById(id);
        return dateMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/subcategory/{subCategoryId}")
    public List<DateMaster> getDatesBySubCategoryId(@PathVariable Integer subCategoryId) {
        return dateMasterService.getDatesBySubCategoryId(subCategoryId);
    }

    // Create a new DateMaster record
    @PostMapping
    public ResponseEntity<DateMaster> createDateMaster(@RequestBody DateMaster dateMaster) {
        DateMaster savedDateMaster = dateMasterService.save(dateMaster);
        return ResponseEntity.ok(savedDateMaster);
    }

    // Update an existing DateMaster record by ID
    @PutMapping("/{id}")
    public ResponseEntity<DateMaster> updateDateMaster(@PathVariable Integer id, @RequestBody DateMaster dateMaster) {
        DateMaster updatedDateMaster = dateMasterService.updateById(id, dateMaster);
        return ResponseEntity.ok(updatedDateMaster);
    }

    // Delete a DateMaster record by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDateMaster(@PathVariable Integer id) {
        dateMasterService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
