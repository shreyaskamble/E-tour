package com.etour.main.service.Category;

import com.etour.main.models.DateMaster;
import com.etour.main.Dao.DateMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DateMasterServiceImpl implements DateMasterService {

    private final DateMasterRepository dateMasterRepository;

    @Autowired
    public DateMasterServiceImpl(DateMasterRepository dateMasterRepository) {
        this.dateMasterRepository = dateMasterRepository;
    }

    @Override
    public List<DateMaster> findAll() {
        return dateMasterRepository.findAll();
    }
    @Override
    public List<DateMaster> getDatesByCategoryMasterId(Integer catmasterId) {
        return dateMasterRepository.findByCategoryMaster_Catmaster_id(catmasterId);
    }

    @Override
    public Optional<DateMaster> findById(Integer id) {
        return dateMasterRepository.findById(id);
    }

    @Override
    public DateMaster save(DateMaster dateMaster) {
        return dateMasterRepository.save(dateMaster);
    }

    @Override
    public DateMaster updateById(Integer id, DateMaster updatedDateMaster) {
        if (dateMasterRepository.existsById(id)) {
            updatedDateMaster.setDepartureId(id);
            return dateMasterRepository.save(updatedDateMaster);
        } else {
            throw new RuntimeException("DateMaster not found with id: " + id);
        }
    }

    @Override
    public void deleteById(Integer id) {
        if (dateMasterRepository.existsById(id)) {
            dateMasterRepository.deleteById(id);
        } else {
            throw new RuntimeException("DateMaster not found with id: " + id);
        }
    }

	@Override
	public List<DateMaster> findByDepartDateBetween(Date startDate, Date endDate) {
		// TODO Auto-generated method stub
		return dateMasterRepository.findByDepartDateBetween(startDate, endDate);
	}
	@Override
	public List<DateMaster> getDatesBySubCategoryId(Integer subCategoryId) {
        return dateMasterRepository.findBySubCategoryMaster_SubCatId(subCategoryId);
    }
	
	public List<DateMaster> getDateMastersWithinRange(Date startDate, Date endDate) {
        return dateMasterRepository.findAllByDateRange(startDate, endDate);
    }
}
