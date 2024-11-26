package com.example.server.service.impl;


import com.example.server.converter.BuildingConverter;
import com.example.server.dto.BuildingDTO;
import com.example.server.entity.BuildingEntity;
import com.example.server.entity.DistrictEntity;
import com.example.server.entity.RentAreaEntity;
import com.example.server.entity.RentTypeEntity;
import com.example.server.repository.BuildingRepository;
import com.example.server.repository.RentTypeRepository;
import com.example.server.repository.custom.BuildingRepositoryCustom;
import com.example.server.repository.custom.DistrictRepositoryCustom;
import com.example.server.repository.custom.RentAreaRepositoryCustom;
import com.example.server.repository.custom.RentTypeRepositoryCustom;
import com.example.server.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BuildingServiceImpl implements BuildingService {

    @Autowired
    private BuildingConverter buildingConverter;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private BuildingRepositoryCustom buildingRepositoryCustom;

    @Autowired
    private DistrictRepositoryCustom districtRepositoryCustom;

    @Autowired
    private RentAreaRepositoryCustom rentAreaRepositoryCustom;

    @Autowired
    private RentTypeRepository rentTypeRepository;

    @Autowired
    private RentTypeRepositoryCustom rentTypeRepositoryCustom;

    @Override
    @Transactional
    public BuildingDTO save(BuildingDTO buildingDTO) {
        BuildingEntity newBuilding = buildingConverter.convertToEntity(buildingDTO);

        //AREA
        String rentArea_s = buildingDTO.getRentArea_s();
        String[] rentAreas = rentArea_s.split(",");
        List<RentAreaEntity> newRentAreas = new ArrayList<>();
        System.out.println("rentAreas: " + rentAreas.toString());
        for(String rentArea: rentAreas){
            RentAreaEntity rentAreaEntity = new RentAreaEntity();
            rentAreaEntity.setBuilding2(newBuilding);
            rentAreaEntity.setValue(Integer.parseInt(rentArea));
            newRentAreas.add(rentAreaEntity);
        }
        newBuilding.setRentAreas(newRentAreas);

        // TYPES
        String rentType_s = buildingDTO.getRentType_s();
        String[] rentTypes = rentType_s.split(",");
        List<RentTypeEntity> newRentTypes = new ArrayList<>();
        for(String rentType: rentTypes){
            RentTypeEntity rentTypeEntity = rentTypeRepository.findByCode(rentType)
                    .orElseGet(() -> {
                        RentTypeEntity newRentTypeEntity = new RentTypeEntity();
                        newRentTypeEntity.setCode(rentType);
                        return newRentTypeEntity;
                    });
            rentTypeEntity.getBuildings2().add(newBuilding);
            newRentTypes.add(rentTypeEntity);
        }
        newBuilding.setRenttypes2(newRentTypes);

        buildingRepository.save(newBuilding);
        return buildingConverter.convertToDTO(newBuilding);
    }

    @Override
    public List<BuildingDTO> findBuildings(Map<String, Object> params) {
        List<BuildingDTO> results = new ArrayList<>();
        List<BuildingEntity> buildingEntities = buildingRepositoryCustom.findBuildings(params);

        Set<Long> districtIds = new HashSet<>();
        buildingEntities.forEach(b -> {
            districtIds.add(Long.valueOf(b.getDistrictId()));
        });
        Map<Long, DistrictEntity> districtById = processDistrictMap(districtIds);

        for(BuildingEntity item: buildingEntities) {
            List<RentAreaEntity> rentAreaEntities = rentAreaRepositoryCustom.findByBuilding_Id(item.getId());

            List<RentTypeEntity> rentTypeEntities = rentTypeRepositoryCustom.findByBuilding_Id(item.getId());
            //System.out.println("rentTypeEntities: " + rentTypeEntities);

            results.add(
                    buildingConverter.toSearchResponse(
                            item,
                            districtById.get(Long.valueOf(item.getDistrictId())),
                            rentAreaEntities,
                            rentTypeEntities
                    ));
        }

        //results = buildingEntities.stream().map(item -> buildingConverter.convertToDTO(item)).collect(Collectors.toList());
        return results;
    }

    @Override
    public List<BuildingDTO> getBuildings(){
        List<BuildingDTO> results = new ArrayList<>();
        List<BuildingEntity> buildingEntities = buildingRepository.findAll();

        Set<Long> districtIds = new HashSet<>();
        buildingEntities.forEach(b -> {
            districtIds.add(Long.valueOf(b.getDistrictId()));
        });

        Map<Long, DistrictEntity> districtById = processDistrictMap(districtIds);

        for(BuildingEntity item: buildingEntities) {
            List<RentAreaEntity> rentAreaEntities = rentAreaRepositoryCustom.findByBuilding_Id(item.getId());

            List<RentTypeEntity> rentTypeEntities = rentTypeRepositoryCustom.findByBuilding_Id(item.getId());
            //System.out.println("rentTypeEntities: " + rentTypeEntities);

            results.add(
                    buildingConverter.toSearchResponse(
                            item,
                            districtById.get(Long.valueOf(item.getDistrictId())),
                            rentAreaEntities,
                            rentTypeEntities
                    ));
        }

        //results = buildingEntities.stream().map(item -> buildingConverter.convertToDTO(item)).collect(Collectors.toList());
        return results;
    }

    private Map<Long, DistrictEntity> processDistrictMap(Set<Long> districtIds){
        List<DistrictEntity> districtEntities = districtRepositoryCustom.findByIdIn(districtIds);
        return Optional.ofNullable(districtEntities)
                .map(result -> result.stream().collect(Collectors.toMap(DistrictEntity::getId, v-> v)))
                .orElse(Collections.emptyMap());
    }
}
