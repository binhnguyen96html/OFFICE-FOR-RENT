package com.example.server.repository.custom;

import com.example.server.entity.RentTypeEntity;

import java.util.List;

public interface RentTypeRepositoryCustom {
    List<RentTypeEntity> findByBuilding_Id(Long buildingId);
}
