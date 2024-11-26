package com.example.server.repository.custom;

import com.example.server.entity.BuildingEntity;

import java.util.List;
import java.util.Map;

public interface BuildingRepositoryCustom {
    List<BuildingEntity> findBuildings(Map<String, Object> params);
}
