package com.etour.main.controller;

import com.etour.main.models.CostMaster;
import com.etour.main.service.Category.CostMasterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins= "http://localhost:3000")
public class CostMasterController {

    @Autowired
    private CostMasterService costMasterService;

    @GetMapping("/costs")
    public List<CostMaster> getAllCosts() {
        return costMasterService.findAll();
    }

    @GetMapping("/cost/{id}")
    public Optional<CostMaster> getCostById(@PathVariable Long id) {
        return costMasterService.findById(id);
    }
    
    @GetMapping("/cost/subCatId/{id}")
    public List<CostMaster> findBySubCategoryId(@PathVariable Long id) {
        return costMasterService.findBySubCategoryId(id);
	    
    }

    @PostMapping("/costs")
    public CostMaster createCost(@RequestBody CostMaster costMaster) {
        return costMasterService.save(costMaster);
    }

//    @PutMapping("/{id}")
//    public CostMaster updateCost(@PathVariable Long id, @RequestBody CostMaster costMaster) {
//        costMaster.setCostId(id);
//        return costMasterService.updateById(costMaster);
//    }

    @DeleteMapping("/costs/{id}")
    public void deleteCost(@PathVariable Long id) {
        costMasterService.deleteById(id);
    }
    
    @GetMapping("/by-cost/{cost}")
    public ResponseEntity<List<CostMaster>> getCostMastersByCost(@PathVariable BigDecimal cost) {
        List<CostMaster> costMasters = costMasterService.findByCost(cost);
        if (costMasters.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(costMasters);
    }
    
}
