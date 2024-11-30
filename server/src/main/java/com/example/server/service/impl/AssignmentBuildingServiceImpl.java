package com.example.server.service.impl;

import com.example.server.dto.request.AssignmentBuildingRequestDTO;
import com.example.server.entity.AssignmentBuildingEntity;
import com.example.server.repository.custom.AssignmentBuildingRepositoryCustom;
import com.example.server.service.AssignmentBuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AssignmentBuildingServiceImpl implements AssignmentBuildingService {

    @Autowired
    private AssignmentBuildingRepositoryCustom assignmentBuildingRepositoryCustom;

    @Override
    @Transactional
    public void updateAssignedStaffsToBuilding(AssignmentBuildingRequestDTO assignmentBuildingRequestDTO) {
        Set<Long> newStaffIds = assignmentBuildingRequestDTO.getStaffIds();
        Long buildingId = assignmentBuildingRequestDTO.getBuildingId();

        Set<Long> currentAssignedStaffIds = assignmentBuildingRepositoryCustom.findBy_BuildingId(buildingId)
                .stream()
                .map(a -> a.getStaffId()).collect(Collectors.toSet());

        Set<Long> deletedStaffIds = findItemOfSourceButNotInTarget(currentAssignedStaffIds, newStaffIds);
        Set<Long> addedStaffIds = findItemOfSourceButNotInTarget(newStaffIds, currentAssignedStaffIds);

        assignmentBuildingRepositoryCustom.assign(deletedStaffIds, addedStaffIds, buildingId);
    }

    private Set<Long> findItemOfSourceButNotInTarget(Set<Long> source, Set<Long> target) {
        Set<Long> result = new HashSet<>();
        Long id = null;

        for (Long srcId : source) {
            for (Long targetId : target) {
                if (Objects.equals(targetId, srcId)) {
                    id = srcId;
                    break;
                }
                id = null;
            }
            if (null == id) {
                result.add(srcId);
            }
        }

        return result;
    }
}
