package com.etour.main.service.Category;




import java.util.List;

import com.etour.main.models.ItineraryMaster;
import com.etour.main.models.SubCategoryMaster;



public interface ItineraryMasterService {
    List<ItineraryMaster> findAll();
    List<ItineraryMaster> getItinerariesByCategoryId(int categoryMaster);
    ItineraryMaster findById(Integer id);
    ItineraryMaster save(ItineraryMaster itineraryMaster);
    void deleteById(Integer id);
    public ItineraryMaster updateById(Integer id, ItineraryMaster updatedItineraryMaster);
    List<ItineraryMaster> getItinerariesBySubCategory(SubCategoryMaster subCategoryMaster);
}

