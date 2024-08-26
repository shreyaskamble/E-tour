package com.etour.main.Dao;




import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.etour.main.models.ItineraryMaster;
import com.etour.main.models.SubCategoryMaster;

public interface ItineraryMasterRepository extends JpaRepository<ItineraryMaster,Integer> {
	@Query("SELECT i FROM ItineraryMaster i WHERE i.categoryMaster.id = :categoryId")
	List<ItineraryMaster> getItinerariesByCategoryId(int categoryId);
	
	List<ItineraryMaster> findBySubCategoryMaster(SubCategoryMaster subCategoryMaster);

}

