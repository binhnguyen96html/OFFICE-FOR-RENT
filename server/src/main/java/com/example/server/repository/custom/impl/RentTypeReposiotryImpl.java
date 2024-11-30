package com.example.server.repository.custom.impl;

import com.example.server.entity.RentTypeEntity;
import com.example.server.repository.custom.RentTypeRepositoryCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RentTypeReposiotryImpl implements RentTypeRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<RentTypeEntity> findByBuilding_Id(Long buildingId) {

        String jpql = "SELECT rt FROM RentTypeEntity rt " +
                        "JOIN rt.buildings2 b " +
                        "WHERE b.id = :buildingId";

        return entityManager.createQuery(jpql, RentTypeEntity.class)
                .setParameter("buildingId", buildingId)
                .getResultList();


//        String sql = "SELECT * FROM renttype INNER JOIN buildingrenttype ON buildingrenttype.renttypeid = renttype.id WHERE buildingrenttype.buildingid="+buildingId;
//        Query query = entityManager.createNativeQuery(sql, RentTypeEntity.class);
//        System.out.println("query.getResultList(): " + query.getResultList());
//        return query.getResultList();

    }
}
