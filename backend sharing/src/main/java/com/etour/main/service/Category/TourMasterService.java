package com.etour.main.service.Category;

import com.etour.main.models.TourMaster;
import java.util.List;
import java.util.Optional;

public interface TourMasterService {
    List<TourMaster> findAll();
    Optional<TourMaster> findById(Integer id);
    List<TourMaster> getTourByCategoryId(int categoryId);
    TourMaster save(TourMaster tourMaster);
    TourMaster updateById(Integer id, TourMaster updatedTourMaster);
    void deleteById(Integer id);
}
