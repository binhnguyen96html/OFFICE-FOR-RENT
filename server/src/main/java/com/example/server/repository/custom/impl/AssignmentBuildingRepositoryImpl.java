package com.example.server.repository.custom.impl;

import com.example.server.entity.AssignmentBuildingEntity;
import com.example.server.repository.custom.AssignmentBuildingRepositoryCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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
}
