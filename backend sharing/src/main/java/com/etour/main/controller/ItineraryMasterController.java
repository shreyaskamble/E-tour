package com.etour.main.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.etour.main.models.ItineraryMaster;
import com.etour.main.models.SubCategoryMaster;
import com.etour.main.service.Category.ItineraryMasterService;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
@CrossOrigin
public class ItineraryMasterController {

    private final ItineraryMasterService itineraryMasterService;

    @Autowired
    public ItineraryMasterController(ItineraryMasterService itineraryMasterService) {
        this.itineraryMasterService = itineraryMasterService;
    }

    @GetMapping
    public List<ItineraryMaster> getAllItineraries() {
        return itineraryMasterService.findAll();
    }
    @GetMapping("itineraries/{categoryid}")
    public List<ItineraryMaster> getItinerariesByCategoryId(@PathVariable int categoryid) {
        return itineraryMasterService.getItinerariesByCategoryId(categoryid);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItineraryMaster> getItineraryById(@PathVariable Integer id) {
        ItineraryMaster itinerary = itineraryMasterService.findById(id);
        if (itinerary != null) {
            return ResponseEntity.ok(itinerary);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/subCategory/{subCatId}")
    public List<ItineraryMaster> getItinerariesBySubCategory(@PathVariable Integer subCatId) {
        SubCategoryMaster subCategoryMaster = new SubCategoryMaster();
        subCategoryMaster.setSubCat_id(subCatId);
        
        return itineraryMasterService.getItinerariesBySubCategory(subCategoryMaster);
    }

    @PostMapping
    public ItineraryMaster createItinerary(@RequestBody ItineraryMaster itineraryMaster) {
        return itineraryMasterService.save(itineraryMaster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItineraryMaster> updateItinerary(@PathVariable Integer id, @RequestBody ItineraryMaster itineraryMaster) {
        ItineraryMaster existingItinerary = itineraryMasterService.findById(id);
        if (existingItinerary != null) {
            itineraryMaster.setItrId(id);
            return ResponseEntity.ok(itineraryMasterService.save(itineraryMaster));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Integer id) {
        itineraryMasterService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
