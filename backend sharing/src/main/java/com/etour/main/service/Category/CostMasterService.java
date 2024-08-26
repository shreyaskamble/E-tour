package com.etour.main.service.Category;

import com.etour.main.models.CostMaster;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

public interface CostMasterService {
    List<CostMaster> findAll();
    Optional<CostMaster> findById(Long id);
    CostMaster save(CostMaster costMaster);
    CostMaster updateById(Long id, CostMaster updatedCostMaster);
    void deleteById(Long id);
    List<CostMaster> findBySubCategoryId(@Param("subCategoryId") Long subCategoryId);
    List<CostMaster> findByCost(BigDecimal cost);
}
