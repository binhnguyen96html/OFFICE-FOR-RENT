package com.example.server.service.impl;


import com.example.server.converter.BuildingConverter;
import com.example.server.dto.BuildingDTO;
import com.example.server.entity.*;
import com.example.server.repository.custom.AssignmentBuildingRepositoryCustom;
import com.example.server.repository.BuildingRepository;
import com.example.server.repository.RentAreaRepository;
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

    @Autowired
    private AssignmentBuildingRepositoryCustom assignmentBuildingRepositoryCustom;

    @Override
    @Transactional
    public BuildingDTO save(BuildingDTO buildingDTO) {
        BuildingEntity newBuilding = buildingConverter.convertToEntity(buildingDTO);

        if(buildingDTO.getId() != null){
            newBuilding.setId(buildingDTO.getId());
        }

        //AREA
        rentAreaRepositoryCustom.deleteByBuilding_Id(newBuilding.getId());
        String rentArea_s = buildingDTO.getRentArea_s();
        if (rentArea_s != null && !rentArea_s.isEmpty()) {
                String[] newRentArea_s = rentArea_s.split(",");
                List<RentAreaEntity> newRentAreas = new ArrayList<>();
                for (String rentArea : newRentArea_s) {
                    RentAreaEntity rentAreaEntity = new RentAreaEntity();
                    rentAreaEntity.setBuilding2(newBuilding);
                    rentAreaEntity.setValue(Integer.parseInt(rentArea.trim())); // Trim to avoid parsing errors
                    newRentAreas.add(rentAreaEntity);
                }
                newBuilding.setRentAreas(newRentAreas);
            } else {
                newBuilding.setRentAreas(Collections.emptyList()); // Ensure no null pointer issues
            }

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
    public Optional<BuildingDTO> findById(Long id) {
        BuildingEntity buildingEntity = buildingRepository.findById(id).orElse(null);

        // Return an empty Optional if the buildingEntity is null
        if (buildingEntity == null) {
            return Optional.empty();
        }

        // Convert the entity to a DTO and return it inside an Optional
        BuildingDTO buildingDTO = buildingConverter.convertToDTO(buildingEntity);

        String rentType_s= buildingEntity.getRenttypes2().stream().map(r -> r.getCode()).collect(Collectors.joining(","));
        buildingDTO.setRentType_s(rentType_s);

        String rentArea_s = buildingEntity.getRentAreas().stream().map(a -> String.valueOf(a.getValue())).collect(Collectors.joining(","));
        buildingDTO.setRentArea_s(rentArea_s);

        return Optional.of(buildingDTO);
    }

    @Override
    @Transactional
    public void deleteBuildingById(Long id) {
        assignmentBuildingRepositoryCustom.deleteAssignmentBuilding_ByBuildingId(id);
        rentAreaRepositoryCustom.deleteByBuilding_Id(id);
        buildingRepository.deleteById(id);
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

    private List<Long> findItemOfSourceButNotInTarget(List<Long> source, List<Long> target) {
        List<Long> result = new ArrayList<>();
        Long id = null;

        for (Long srcId : source) {
            for (Long targetId : target) {
                if (Objects.equals(targetId, srcId)) {
                    id = srcId;
                    break;
                }
                id = null;
            }
            if (null == id) {
                result.add(srcId);
            }
        }

        return result;
    }
}
