package com.etour.main.Dao;

import com.etour.main.models.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryMasterRepository extends JpaRepository<CategoryMaster,Integer> {
	
	@Query("SELECT c FROM CategoryMaster c WHERE c.cat_id = :catId")
	List<CategoryMaster> findByCatId(@Param("catId") String catId);
	
	List<CategoryMaster> findByCategoryId(String categoryId);

}
