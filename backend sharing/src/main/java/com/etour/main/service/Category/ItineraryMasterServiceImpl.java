package com.etour.main.service.Category;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etour.main.Dao.ItineraryMasterRepository;
import com.etour.main.models.ItineraryMaster;
import com.etour.main.models.SubCategoryMaster;

import java.util.List;
import java.util.Optional;

@Service
public class ItineraryMasterServiceImpl implements ItineraryMasterService {

    private final ItineraryMasterRepository itineraryMasterRepository;

    @Autowired
    public ItineraryMasterServiceImpl(ItineraryMasterRepository itineraryMasterRepository) {
        this.itineraryMasterRepository = itineraryMasterRepository;
    }

    @Override
    public List<ItineraryMaster> findAll() {
        return itineraryMasterRepository.findAll();
    }

    @Override
    public ItineraryMaster findById(Integer id) {
        Optional<ItineraryMaster> result = itineraryMasterRepository.findById(id);
        return result.orElse(null);
    }

    @Override
    public ItineraryMaster save(ItineraryMaster itineraryMaster) {
        return itineraryMasterRepository.save(itineraryMaster);
    }

    @Override
    public void deleteById(Integer id) {
        itineraryMasterRepository.deleteById(id);
    }
    
    @Override
    public ItineraryMaster updateById(Integer id, ItineraryMaster updatedItineraryMaster) {
        return itineraryMasterRepository.findById(id)
            .map(itinerary -> {
                // Update fields with new values
                itinerary.setCategoryMaster(updatedItineraryMaster.getCategoryMaster());
                itinerary.setDayNo(updatedItineraryMaster.getDayNo());
                itinerary.setItrDtl(updatedItineraryMaster.getItrDtl());
                return itineraryMasterRepository.save(itinerary);
            })
            .orElseThrow(() -> new RuntimeException("Itinerary not found with id " + id));
    }

	@Override
	public List<ItineraryMaster> getItinerariesByCategoryId(int categoryMaster) {
		
		return itineraryMasterRepository.getItinerariesByCategoryId(categoryMaster);
	}
	public List<ItineraryMaster> getItinerariesBySubCategory(SubCategoryMaster subCategoryMaster) {
        return itineraryMasterRepository.findBySubCategoryMaster(subCategoryMaster);
    }
}

