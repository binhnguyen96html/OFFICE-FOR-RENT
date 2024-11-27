package com.example.server.repository.custom;

import com.example.server.entity.RentAreaEntity;

import java.util.List;

public interface RentAreaRepositoryCustom {
    List<RentAreaEntity> findByBuilding_Id(Long buildingId);
    void updateRentArea(List<Long> deletedRentAreaIds, List<RentAreaEntity> addedRentAreaEntities);
    void deleteByBuilding_Id(Long buildingId);
}
