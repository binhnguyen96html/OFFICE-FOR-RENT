package com.example.server.repository.custom;

import com.example.server.entity.CustomerEntity;

import java.util.List;
import java.util.Map;

public interface CustomerRepositoryCustom {
    List<CustomerEntity> findCustomers(Map<String, Object> params);
}
