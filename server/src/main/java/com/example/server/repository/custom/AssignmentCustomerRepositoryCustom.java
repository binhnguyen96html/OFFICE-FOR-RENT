package com.example.server.repository.custom;

import com.example.server.entity.AssignmentCustomerEntity;

import java.util.List;
import java.util.Set;

public interface AssignmentCustomerRepositoryCustom {
    void deleteAssignmentCustomer_ByCustomerId(Long customerId);

    List<AssignmentCustomerEntity> find_ByCustomerId(Long customerId);

    void deleteAssignmentCustomer_ByStaffIdsIn(Long customerIds, Set<Long> staffIds);

    void insertAssignmentCustomer(Long customerId, Set<Long> staffIds);

    void assign(Set<Long> deletedStaffIds, Set<Long> addedStaffIds, Long customerId);
}
