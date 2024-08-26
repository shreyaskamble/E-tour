package com.etour.main.controller;

import com.etour.main.models.CustomerMaster;
import com.etour.main.service.Category.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin
public class CustomerMasterController {

    private final CustomerMasterService customerMasterService;

    @Autowired
    public CustomerMasterController(CustomerMasterService customerMasterService) {
        this.customerMasterService = customerMasterService;
    }

    // Get all customers
    @GetMapping
    public ResponseEntity<List<CustomerMaster>> getAllCustomers() {
        List<CustomerMaster> customers = customerMasterService.findAll();
        return ResponseEntity.ok(customers);
    }

    // Get a specific customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerMaster> getCustomerById(@PathVariable Integer id) {
        Optional<CustomerMaster> customer = customerMasterService.findById(id);
        return customer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/customer/login/{username}/{password}")   // used to get the customer id if the valid user has passed proper username and password 
	public Optional<CustomerMaster> getCustomerUsingUserNameAndPassword(@PathVariable String username, @PathVariable String password )
	{
		return customerMasterService.findByUserNameAndPassword(username, password);
	}

    // Create a new customer
    @PostMapping
    public ResponseEntity<CustomerMaster> createCustomer(@RequestBody CustomerMaster customerMaster) {
        CustomerMaster savedCustomer = customerMasterService.save(customerMaster);
        return ResponseEntity.ok(savedCustomer);
    }

    // Update an existing customer by ID
    @PutMapping("/{id}")
    public ResponseEntity<CustomerMaster> updateCustomer(@PathVariable Integer id, @RequestBody CustomerMaster customerMaster) {
        CustomerMaster updatedCustomer = customerMasterService.updateById(id, customerMaster);
        return ResponseEntity.ok(updatedCustomer);
    }

    // Delete a customer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerMasterService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
