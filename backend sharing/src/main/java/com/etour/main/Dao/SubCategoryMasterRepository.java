package com.etour.main.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.etour.main.models.CategoryMaster;
import com.etour.main.models.CostMaster;
import com.etour.main.models.SubCategoryMaster;

public interface SubCategoryMasterRepository extends JpaRepository<SubCategoryMaster,Integer>{
	@Query("SELECT i FROM SubCategoryMaster i WHERE i.categoryMaster.id = :categoryId")
    List<SubCategoryMaster> findAllByCategoryId(Long categoryId);
	
	
//	@Query("SELECT m FROM SubCategoryMaster m JOIN m.costMasters c WHERE c.subCategory.id = :subCategoryId")
//	List<SubCategoryMaster> findAllCostBySubCategoryId(@Param("subCategoryId") Long subCategoryId);
//	@Query("SELECT c FROM CostMaster c WHERE c.subCategoryMaster.id = :subCategoryId")
//	List<CostMaster> findCostsBySubCategoryId(@Param("subCategoryId") Long subCategoryId);
	
	@Query("SELECT c FROM CostMaster c JOIN c.subCategoryMaster s JOIN s.categoryMaster cat WHERE cat.id = :subCategoryId")
	List<CostMaster> findCostsBySubCategoryId(@Param("subCategoryId") Long subCategoryId);

//	
//	@Query("SELECT c FROM CostMaster c JOIN c.subCategoryMaster s JOIN s.categoryMaster cat WHERE cat.id = :categoryId")
//	List<CostMaster> findCostsBySubCategoryId(@Param("categoryId") Long categoryId);
	
	List<SubCategoryMaster> findBySubCatName(String subCatName);

}
