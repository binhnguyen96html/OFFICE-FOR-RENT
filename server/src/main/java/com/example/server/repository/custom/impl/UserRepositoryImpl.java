package com.example.server.repository.custom.impl;

import com.example.server.entity.AssignmentBuildingEntity;
import com.example.server.entity.UserEntity;
import com.example.server.repository.custom.AssignmentBuildingRepositoryCustom;
import com.example.server.repository.custom.UserRepositoryCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<UserEntity> findAssignedStaffs_ByBuildingId(Long buildingId) {
        String sql = "SELECT u FROM UserEntity u JOIN u.building3 b WHERE b.id = :buildingId";

        return entityManager.createQuery(sql, UserEntity.class)
                .setParameter("buildingId", buildingId)
                .getResultList();
    }
}
