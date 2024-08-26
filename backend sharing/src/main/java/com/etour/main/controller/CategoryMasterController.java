package com.etour.main.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.etour.main.models.CategoryMaster;
import com.etour.main.models.CustomerMaster;
import com.etour.main.service.Category.CategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin

public class CategoryMasterController {
	 private final CategoryService categoryService;
	@Autowired
	public CategoryMasterController(CategoryService categoryService) {
		super();
		this.categoryService = categoryService;
	}
	 @GetMapping
	 public List<CategoryMaster>getCategoryAll(){
		return categoryService.getCategory();
		 
	 }
	 
	 @GetMapping("/bycategory/{category_id}")
	    public ResponseEntity<List<CategoryMaster>> getCategoriesByCategoryId(@PathVariable String category_id) {
	        List<CategoryMaster> categories = categoryService.getCategoriesByCategoryId(category_id);
	        if (categories != null && !categories.isEmpty()) {
	            return ResponseEntity.ok(categories);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	 @GetMapping("/bycatId/{catId}")
	    public List<CategoryMaster> getCategories(@PathVariable String catId) {
	        return categoryService.getCategoriesByCatId(catId);
	    }
	 @GetMapping("/{id}")
	    public ResponseEntity<CategoryMaster> getCategoryById(@PathVariable Integer id) {
	        CategoryMaster category = categoryService.findById(id);
	        if (category != null) {
	            return ResponseEntity.ok(category);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }


	    @PostMapping
	    public CategoryMaster createCategory(@RequestBody CategoryMaster categoryMaster) {
	        return categoryService.save(categoryMaster);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<CategoryMaster> updateCategory(@PathVariable Integer id, @RequestBody CategoryMaster categoryMaster) {
	        CategoryMaster existingCategory = categoryService.findById(id);
	        if (existingCategory != null) {
	            categoryMaster.setCatmaster_id(id);  // Ensure the ID remains the same
	            return ResponseEntity.ok(categoryService.save(categoryMaster));
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
	        categoryService.deleteById(id);
	        return ResponseEntity.noContent().build();
	    }

}
