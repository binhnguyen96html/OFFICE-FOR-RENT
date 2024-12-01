package com.example.server.service;

import com.example.server.dto.CustomerDTO;
import com.example.server.dto.UserDTO;
import com.example.server.entity.CustomerEntity;

import java.util.List;
import java.util.Map;

public interface CustomerService {
    List<CustomerDTO> findAllCustomers();

    List<CustomerDTO> findCustomers(Map<String, Object> params);

    CustomerDTO save(CustomerDTO customerDTO);

    CustomerDTO findCustomerById(Long id);

    void deleteCustomerById(Long id);

}
