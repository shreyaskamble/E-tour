package com.etour.main.Dao;

import com.etour.main.models.TourMaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TourMasterRepository extends JpaRepository<TourMaster, Integer> {
	@Query("SELECT i FROM TourMaster i WHERE i.categoryMaster.id = :categoryId")
	List<TourMaster> getTourByCategoryId(int categoryId);
}
