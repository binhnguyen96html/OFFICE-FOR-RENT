package com.example.server.service.impl;


import com.example.server.converter.CustomerConverter;
import com.example.server.dto.BuildingDTO;
import com.example.server.dto.CustomerDTO;
import com.example.server.entity.CustomerEntity;
import com.example.server.repository.CustomerRepository;
import com.example.server.repository.custom.AssignmentBuildingRepositoryCustom;
import com.example.server.repository.custom.AssignmentCustomerRepositoryCustom;
import com.example.server.repository.custom.CustomerRepositoryCustom;
import com.example.server.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerRepositoryCustom customerRepositoryCustom;
    @Autowired
    private AssignmentCustomerRepositoryCustom assignmentCustomerRepositoryCustom;
    @Autowired
    private CustomerConverter customerConverter;

    @Override
    public List<CustomerDTO> findAllCustomers() {
        List<CustomerEntity> customerEntities = customerRepository.findAll();
        List<CustomerDTO> customerDTOS = customerEntities.stream()
                .map(c -> customerConverter.convertEntityToDTO(c))
                .collect(Collectors.toList());
        return customerDTOS;
    }

    @Override
    @Transactional
    public List<CustomerDTO> findCustomers(Map<String, Object> params) {
        List<CustomerEntity> customerEntities = customerRepositoryCustom.findCustomers(params);
        List<CustomerDTO> customerDTOS = customerEntities.stream()
                .map(c -> customerConverter.convertEntityToDTO(c))
                .collect(Collectors.toList());
        return customerDTOS;
    }

    @Override
    @Transactional
    public CustomerDTO save(CustomerDTO customerDTO) {
        CustomerEntity newCustomer = customerConverter.convertDTOToEntity(customerDTO);

        //FOR CREATE NEW CUSTOMER
        if(customerDTO.getId() == null){
            newCustomer.setCreatedDate(new Date());
        }

        //FOR UPDATE CUSTOMER
        if(customerDTO.getId() != null){
            newCustomer.setId(customerDTO.getId());
            newCustomer.setModifiedDate(new Date());

        }

        customerRepository.save(newCustomer);
        return customerConverter.convertEntityToDTO(newCustomer);
    }

    @Override
    public CustomerDTO findCustomerById(Long id) {
        CustomerEntity customerEntity = customerRepository.findById(id).orElse(null);
        CustomerDTO customerDTO = customerConverter.convertEntityToDTO(customerEntity);
        return Optional.ofNullable(customerDTO).orElse(null);
    }

    @Override
    @Transactional
    public void deleteCustomerById(Long customerId) {
        assignmentCustomerRepositoryCustom.deleteAssignmentCustomer_ByCustomerId(customerId);
        customerRepository.deleteById(customerId);
    }
}
