package com.example.server.dto.request;

import java.util.Set;

public class AssignmentCustomerRequestDTO {

    private Long customerId;
    private Set<Long> staffIds;

    public AssignmentCustomerRequestDTO(Long customerId, Set<Long> staffIds) {
        this.customerId = customerId;
        this.staffIds = staffIds;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Set<Long> getStaffIds() {
        return staffIds;
    }

    public void setStaffIds(Set<Long> staffIds) {
        this.staffIds = staffIds;
    }
}