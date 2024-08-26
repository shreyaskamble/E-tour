package com.etour.main.service.Category;

import com.etour.main.models.CategoryMaster;
import com.etour.main.models.CostMaster;
import com.etour.main.models.SubCategoryMaster;
import java.util.List;
import java.util.Optional;

public interface SubCategoryMasterService {
    List<SubCategoryMaster> findAll();
    Optional<SubCategoryMaster> findById(Integer id);
    List<SubCategoryMaster> findAllByCategoryId(Long categoryId);
    SubCategoryMaster save(SubCategoryMaster subCategoryMaster);
    SubCategoryMaster updateById(Integer id, SubCategoryMaster updatedSubCategoryMaster);
    void deleteById(Integer id);
//    List<SubCategoryMaster>findAllCostBySubCategoryId(Long subCategoryId);
    List<CostMaster> findCostsBySubCategoryId(Long subCategoryId);
    List<SubCategoryMaster> searchBySubCatName(String subCatName);
}
