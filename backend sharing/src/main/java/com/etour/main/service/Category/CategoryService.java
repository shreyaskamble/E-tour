package com.etour.main.service.Category;

import java.util.List;

import com.etour.main.models.CategoryMaster;

public interface CategoryService {
    List<CategoryMaster> getCategory();
    
	CategoryMaster findById(Integer id);
    CategoryMaster save(CategoryMaster categoryMaster);
    void deleteById(Integer id);
    List<CategoryMaster> getCategoriesByCatId(String catId);
    List<CategoryMaster> getCategoriesByCategoryId(String category_id);
	
	

}
