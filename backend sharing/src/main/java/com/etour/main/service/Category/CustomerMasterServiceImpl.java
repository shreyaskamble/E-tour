package com.etour.main.service.Category;

import com.etour.main.models.CustomerMaster;
import com.etour.main.Dao.CustomerMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerMasterServiceImpl implements CustomerMasterService {

    private final CustomerMasterRepository customerMasterRepository;

    @Autowired
    public CustomerMasterServiceImpl(CustomerMasterRepository customerMasterRepository) {
        this.customerMasterRepository = customerMasterRepository;
    }

    @Override
    public List<CustomerMaster> findAll() {
        return customerMasterRepository.findAll();
    }

    @Override
    public Optional<CustomerMaster> findById(Integer id) {
        return customerMasterRepository.findById(id);
    }

    @Override
    public CustomerMaster save(CustomerMaster customerMaster) {
        return customerMasterRepository.save(customerMaster);
    }

    @Override
    public CustomerMaster updateById(Integer id, CustomerMaster updatedCustomerMaster) {
        if (customerMasterRepository.existsById(id)) {
            updatedCustomerMaster.setCustId(id);
            return customerMasterRepository.save(updatedCustomerMaster);
        } else {
            throw new RuntimeException("CustomerMaster not found with id: " + id);
        }
    }

    @Override
    public void deleteById(Integer id) {
        if (customerMasterRepository.existsById(id)) {
            customerMasterRepository.deleteById(id);
        } else {
            throw new RuntimeException("CustomerMaster not found with id: " + id);
        }
    }

	@Override
	public Optional<CustomerMaster> findByUserNameAndPassword(String username, String password) {
		// TODO Auto-generated method stub
		return customerMasterRepository.findByUserNameAndPassWord(username, password);
	}
}
