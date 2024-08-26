package com.etour.main.Dao;

import com.etour.main.models.CostMaster;

import jakarta.persistence.TypedQuery;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CostMasterRepository extends JpaRepository<CostMaster,Long> {

	 @Query("SELECT c FROM CostMaster c WHERE c.subCategoryMaster.id = :subCategoryId")
	    List<CostMaster> findBySubCategoryId(@Param("subCategoryId") Long subCategoryId);
	 
	 List<CostMaster> findByCost(BigDecimal cost);
}
