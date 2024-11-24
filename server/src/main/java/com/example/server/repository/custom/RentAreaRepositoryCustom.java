package com.example.server.repository.custom;

import com.example.server.entity.RentAreaEntity;

import java.util.List;

public interface RentAreaRepositoryCustom {
    List<RentAreaEntity> findByBuilding_Id(Long buildingId);
}
