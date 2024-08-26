package com.etour.main.service.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import com.etour.main.Dao.CostMasterRepository;
import com.etour.main.models.CostMaster;

import jakarta.persistence.TypedQuery;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CostMasterServiceImpl implements CostMasterService {

    private final CostMasterRepository costMasterRepository;

    @Autowired
    public CostMasterServiceImpl(CostMasterRepository costMasterRepository) {
        this.costMasterRepository = costMasterRepository;
    }

    @Override
    public List<CostMaster> findAll() {
        return costMasterRepository.findAll();
    }

    @Override
    public Optional<CostMaster> findById(Long id) {
        return costMasterRepository.findById(id);
    }

    @Override
    public CostMaster save(CostMaster costMaster) {
        return costMasterRepository.save(costMaster);
    }

    @Override
    public CostMaster updateById(Long id, CostMaster updatedCostMaster) {
        return costMasterRepository.findById(id)
            .map(existingCostMaster -> {
                
                existingCostMaster.setCost(updatedCostMaster.getCost());
                existingCostMaster.setSinglePrsnCost(updatedCostMaster.getSinglePrsnCost());
                existingCostMaster.setExtraPrsnCost(updatedCostMaster.getExtraPrsnCost());
                existingCostMaster.setChildWithBed(updatedCostMaster.getChildWithBed());
                existingCostMaster.setChildWithoutBed(updatedCostMaster.getChildWithoutBed());
                existingCostMaster.setValidFrom(updatedCostMaster.getValidFrom());
                existingCostMaster.setValidTo(updatedCostMaster.getValidTo());
                return costMasterRepository.save(existingCostMaster);
            })
            .orElseThrow(() -> new RuntimeException("CostMaster not found with id " + id));
    }

    @Override
    public void deleteById(Long id) {
        costMasterRepository.deleteById(id);
    }

	@Override
	public List<CostMaster> findBySubCategoryId(Long subCategoryId) {
		// TODO Auto-generated method stub
		return costMasterRepository.findBySubCategoryId(subCategoryId);
		
	}
	
	public List<CostMaster> findByCost(BigDecimal cost) {
        return costMasterRepository.findByCost(cost);
    }
    

}
