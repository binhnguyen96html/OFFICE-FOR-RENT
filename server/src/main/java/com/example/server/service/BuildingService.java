package com.example.server.service;


import com.example.server.dto.BuildingDTO;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BuildingService {
    List<BuildingDTO> getBuildings();

    BuildingDTO save(BuildingDTO buildingDTO);

    List<BuildingDTO> findBuildings(Map<String, Object> params);

    Optional<BuildingDTO> findById(Long id);

    void deleteBuildingById(Long id);
}
