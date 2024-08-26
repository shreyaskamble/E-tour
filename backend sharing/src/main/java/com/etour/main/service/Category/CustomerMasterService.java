package com.etour.main.service.Category;

import com.etour.main.models.CustomerMaster;

import java.util.List;
import java.util.Optional;

public interface CustomerMasterService {
    List<CustomerMaster> findAll();
    Optional<CustomerMaster> findByUserNameAndPassword(String username, String password);
    Optional<CustomerMaster> findById(Integer id);
    CustomerMaster save(CustomerMaster customerMaster);
    CustomerMaster updateById(Integer id, CustomerMaster updatedCustomerMaster);
    void deleteById(Integer id);
}
