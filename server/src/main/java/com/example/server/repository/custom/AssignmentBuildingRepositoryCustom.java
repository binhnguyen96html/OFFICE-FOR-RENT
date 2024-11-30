package com.example.server.repository.custom;


import com.example.server.entity.AssignmentBuildingEntity;

import java.util.List;
import java.util.Set;

public interface AssignmentBuildingRepositoryCustom {
    void deleteAssignmentBuilding_ByBuildingId(Long buildingId);

    List<AssignmentBuildingEntity> findBy_BuildingId(Long buildingId);

    void deteleAssignmentBuilding_ByStaffIdsIn(Long buildingId, Set<Long> staffIds);

    void insertAssignmentBuildings(Long buildingId, Set<Long> staffIds);

    void assign(Set<Long> deletedStaffIds, Set<Long> addedStaffIds, Long buildingId);
}
