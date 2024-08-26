package com.etour.main.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.etour.main.models.CategoryMaster;
import com.etour.main.models.CostMaster;
import com.etour.main.models.SubCategoryMaster;
import com.etour.main.service.Category.SubCategoryMasterService;

@RestController
@CrossOrigin
@RequestMapping("/api/")
public class SubCategoryController {

    private final SubCategoryMasterService subCategoryMasterService;

    @Autowired
    public SubCategoryController(SubCategoryMasterService subCategoryMasterService) {
        this.subCategoryMasterService = subCategoryMasterService;
    }

    @GetMapping(value="subCategories")
    public List<SubCategoryMaster> getAllSubCategories() {
        return subCategoryMasterService.findAll();
    }
    @GetMapping("subCategories/{subCatId}")
    public Optional<SubCategoryMaster> findById(@PathVariable Integer  subCatId){
    	return subCategoryMasterService.findById(subCatId);
    }
    
    
    @GetMapping("byCategory/{categoryId}")
    public List<SubCategoryMaster> getSubCategoriesByCategoryId(@PathVariable Long categoryId) {
        return subCategoryMasterService.findAllByCategoryId(categoryId);
    }
//    @GetMapping("subCategeryAndCosts/{subCatId}")
//    public List<SubCategoryMaster>findAllCostBySubCategoryId(@PathVariable Long subCatId){
//    	return subCategoryMasterService.findAllCostBySubCategoryId(subCatId);
//    }
    
    @GetMapping("costsBySubCategory/{subCatId}")
    public List<CostMaster> findCostsBySubCategoryId(@PathVariable Long subCatId) {
        return subCategoryMasterService.findCostsBySubCategoryId(subCatId);
    }
    
    @GetMapping("subcategoriesByName/{subCatName}")
    public List<SubCategoryMaster> getSubCategoriesByName(@PathVariable String subCatName) {
        return subCategoryMasterService.searchBySubCatName(subCatName);
    }

}
