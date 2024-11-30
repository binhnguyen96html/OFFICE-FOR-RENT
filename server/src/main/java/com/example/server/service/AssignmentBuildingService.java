package com.example.server.service;


import com.example.server.dto.request.AssignmentBuildingRequestDTO;

import java.util.Set;

public interface AssignmentBuildingService {
    void updateAssignedStaffsToBuilding(AssignmentBuildingRequestDTO assignmentBuildingRequestDTO);
}
