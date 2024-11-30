package com.example.server.repository.custom.impl;

import com.example.server.entity.AssignmentBuildingEntity;
import com.example.server.repository.custom.AssignmentBuildingRepositoryCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class AssignmentBuildingRepositoryImpl implements AssignmentBuildingRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void deleteAssignmentBuilding_ByBuildingId(Long buildingId) {
        String sql = "DELETE FROM assignmentbuilding WHERE buildingid = " + buildingId;
        System.out.println("deleteAssignmentBuilding_ByBuildingId  SQL: " + sql);
        Query query = entityManager.createNativeQuery(sql, AssignmentBuildingEntity.class);
        query.executeUpdate();
    }

    @Override
    public List<AssignmentBuildingEntity> findBy_BuildingId(Long buildingId) {

        String sql = "SELECT * FROM assignmentbuilding WHERE buildingid = " + buildingId;
        System.out.println("findBy_BuildingId, sql: " + sql);
        Query query = entityManager.createNativeQuery(sql, AssignmentBuildingEntity.class);
        return query.getResultList();
    }

    @Override
    public void deteleAssignmentBuilding_ByStaffIdsIn(Long buildingId, Set<Long> staffIds) {
        if (staffIds == null || staffIds.isEmpty()) {
            // No deletion required as the set is empty
            return;
        }

        String sql = "DELETE FROM assignmentbuilding WHERE buildingid=" + buildingId;
        sql += " AND staffid IN (" + staffIds.stream().map(i -> i.toString()).collect(Collectors.joining(",")) + ")";
        System.out.println("deteleAssignmentBuilding_ByStaffIdsIn sql: " + sql);
        Query query = entityManager.createNativeQuery(sql, AssignmentBuildingEntity.class);
        query.executeUpdate();
    }

    @Override
    public void insertAssignmentBuildings(Long buildingId, Set<Long> staffIds) {
        if (staffIds == null || staffIds.isEmpty()) {
            // No deletion required as the set is empty
            return;
        }

        String sql = "INSERT INTO assignmentbuilding(staffid, buildingid) VALUES";
        sql += staffIds.stream().map(i -> "("+i+","+buildingId+")").collect(Collectors.joining(","));
        System.out.println("insertAssignmentBuildings sql: " + sql);
        Query query = entityManager.createNativeQuery(sql, AssignmentBuildingEntity.class);
        query.executeUpdate();
    }


    @Override
    public void assign(Set<Long> deletedStaffIds, Set<Long> addedStaffIds, Long buildingId) {
            deteleAssignmentBuilding_ByStaffIdsIn(buildingId, deletedStaffIds);
            insertAssignmentBuildings(buildingId, addedStaffIds);
    }
}
