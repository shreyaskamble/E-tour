package com.etour.main.service.Category;

import com.etour.main.models.TourMaster;
import com.etour.main.Dao.TourMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TourMasterServiceImpl implements TourMasterService {

    private final TourMasterRepository tourMasterRepository;

    @Autowired
    public TourMasterServiceImpl(TourMasterRepository tourMasterRepository) {
        this.tourMasterRepository = tourMasterRepository;
    }

    @Override
    public List<TourMaster> findAll() {
        return tourMasterRepository.findAll();
    }

    @Override
    public Optional<TourMaster> findById(Integer id) {
        return tourMasterRepository.findById(id);
    }

    @Override
    public TourMaster save(TourMaster tourMaster) {
        return tourMasterRepository.save(tourMaster);
    }

    @Override
    public TourMaster updateById(Integer id, TourMaster updatedTourMaster) {
        if (tourMasterRepository.existsById(id)) {
            updatedTourMaster.setTourId(id);
            return tourMasterRepository.save(updatedTourMaster);
        } else {
            throw new RuntimeException("TourMaster not found with id: " + id);
        }
    }

    @Override
    public void deleteById(Integer id) {
        if (tourMasterRepository.existsById(id)) {
            tourMasterRepository.deleteById(id);
        } else {
            throw new RuntimeException("TourMaster not found with id: " + id);
        }
    }

	@Override
	public List<TourMaster> getTourByCategoryId(int categoryId) {
		// TODO Auto-generated method stub
		return tourMasterRepository.getTourByCategoryId(categoryId);
	}
}
