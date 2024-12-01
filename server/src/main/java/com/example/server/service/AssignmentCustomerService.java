package com.example.server.service;

import com.example.server.dto.request.AssignmentCustomerRequestDTO;

public interface AssignmentCustomerService {
    void updateAssignedStaffsToCustomer(AssignmentCustomerRequestDTO assignmentCustomerRequestDTO);
}
