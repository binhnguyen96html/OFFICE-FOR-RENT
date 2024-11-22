package com.example.server.service.impl;


import com.example.server.converter.BuildingConverter;
import com.example.server.dto.BuildingDTO;
import com.example.server.entity.BuildingEntity;
import com.example.server.repository.BuildingRepository;
import com.example.server.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuildingServiceImpl implements BuildingService {

    @Autowired
    private BuildingConverter buildingConverter;

    @Autowired
    private BuildingRepository buildingRepository;

    @Override
    public List<BuildingDTO> getBuildings(){
        List<BuildingDTO> results = new ArrayList<>();
        List<BuildingEntity> buildingEntities = buildingRepository.findAll();
        results = buildingEntities.stream().map(item -> buildingConverter.convertToDTO(item)).collect(Collectors.toList());
        return results;
    }
}
