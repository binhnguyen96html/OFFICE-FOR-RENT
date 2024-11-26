package com.example.server.service;


import com.example.server.dto.BuildingDTO;

import java.util.List;
import java.util.Map;

public interface BuildingService {
    List<BuildingDTO> getBuildings();

    BuildingDTO save(BuildingDTO buildingDTO);

    List<BuildingDTO> findBuildings(Map<String, Object> params);
}
