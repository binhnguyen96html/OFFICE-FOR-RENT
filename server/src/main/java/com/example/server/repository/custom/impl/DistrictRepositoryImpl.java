package com.example.server.repository.custom.impl;

import com.example.server.entity.DistrictEntity;
import com.example.server.repository.custom.DistrictRepositoryCustom;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Set;


@Repository
public class DistrictRepositoryImpl implements DistrictRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DistrictEntity> findByIdIn(Set<Long> districtIds) {
        //List<DistrictEntity> results = new ArrayList<>();
        String sql = "SELECT * FROM district WHERE id IN(" + StringUtils.join(districtIds, ",") + ")";
        Query query = entityManager.createNativeQuery(sql.toString(), DistrictEntity.class);
        return query.getResultList();
    }
}
