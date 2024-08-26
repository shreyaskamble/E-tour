package com.etour.main.service.Category;

import com.etour.main.models.DateMaster;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface DateMasterService {
    List<DateMaster> findAll();
    List<DateMaster> findByDepartDateBetween(Date startDate,Date endDate);
    Optional<DateMaster> findById(Integer id);
    DateMaster save(DateMaster dateMaster);
    DateMaster updateById(Integer id, DateMaster updatedDateMaster);
    void deleteById(Integer id);
    List<DateMaster> getDatesBySubCategoryId(Integer subCategoryId);
    List<DateMaster> getDatesByCategoryMasterId(Integer catmasterId);
    List<DateMaster> getDateMastersWithinRange(Date startDate, Date endDate);
}
