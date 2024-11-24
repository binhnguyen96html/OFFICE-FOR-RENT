package com.example.server.repository.custom.impl;

import com.example.server.entity.RentAreaEntity;
import com.example.server.repository.custom.RentAreaRepositoryCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class RentAreaRepositoryImpl implements RentAreaRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<RentAreaEntity> findByBuilding_Id(Long buildingId) {
        String sql = "From RentAreaEntity where building2.id="+buildingId+"";
        Query query = entityManager.createQuery(sql, RentAreaEntity.class);

        return query.getResultList();
    }
}
