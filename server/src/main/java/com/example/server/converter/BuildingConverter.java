package com.example.server.converter;

import com.example.server.dto.BuildingDTO;
import com.example.server.dto.DistrictDTO;
import com.example.server.dto.RentAreaDTO;
import com.example.server.dto.RentTypeDTO;
import com.example.server.entity.BuildingEntity;
import com.example.server.entity.DistrictEntity;
import com.example.server.entity.RentAreaEntity;
import com.example.server.entity.RentTypeEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class BuildingConverter {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RentAreaConverter rentAreaConverter;

    @Autowired
    private DistrictConverter districtConverter;

    @Autowired
    private RentTypeConverter rentTypeConverter;

    public BuildingDTO toSearchResponse(
            BuildingEntity buildingEntity,
            DistrictEntity districtEntity,
            List<RentAreaEntity> rentAreaEntities,
            List<RentTypeEntity> rentTypeEntities
    ) {
        BuildingDTO buildingDTO = modelMapper.map(buildingEntity, BuildingDTO.class);
        DistrictDTO districtDTO = districtConverter.convertToDTO(districtEntity);
        List<RentAreaDTO> rentAreaDTOs = rentAreaEntities
                .stream()
                .map(i -> rentAreaConverter.convertEntityToDTO(i))
                .collect(Collectors.toList());
        List<RentTypeDTO> rentTypeDTOs = rentTypeEntities
                .stream()
                .map(i -> rentTypeConverter.convertEntityToDTO(i))
                .collect(Collectors.toList());

        buildingDTO.setAddress(buildingDTO.getStreet() +", "+ buildingDTO.getWard() +", "+districtDTO.getName());
        buildingDTO.setRentAreas(rentAreaDTOs);
        buildingDTO.setRentTypes(rentTypeDTOs);

        return buildingDTO;
    }

    public BuildingDTO convertToDTO(BuildingEntity entity) {
        BuildingDTO dto = modelMapper.map(entity, BuildingDTO.class);
        dto.setAddress(dto.getStreet() +", "+ dto.getWard() +", "+dto.getDistrictId());
        return dto;
    }

    public BuildingEntity convertToEntity(BuildingDTO dto) {
        BuildingEntity entity = modelMapper.map(dto, BuildingEntity.class);
        return entity;
    }

}