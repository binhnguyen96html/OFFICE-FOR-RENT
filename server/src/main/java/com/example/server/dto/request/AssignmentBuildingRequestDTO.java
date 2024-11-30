package com.example.server.dto.request;

import java.util.List;
import java.util.Set;

public class AssignmentBuildingRequestDTO {

    private Long buildingId;
    private Set<Long> staffIds;

    public AssignmentBuildingRequestDTO(Long buildingId, Set<Long> staffIds) {
        this.buildingId = buildingId;
        this.staffIds = staffIds;
    }

    public Long getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Long buildingId) {
        this.buildingId = buildingId;
    }

    public Set<Long> getStaffIds() {
        return staffIds;
    }

    public void setStaffIds(Set<Long> staffIds) {
        this.staffIds = staffIds;
    }
}