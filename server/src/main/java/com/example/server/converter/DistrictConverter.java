package com.example.server.converter;

import com.example.server.dto.DistrictDTO;
import com.example.server.entity.DistrictEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DistrictConverter {

    @Autowired
    private ModelMapper modelMapper;

    public DistrictDTO convertToDTO(DistrictEntity entity) {
        DistrictDTO dto = modelMapper.map(entity, DistrictDTO.class);
        return dto;
    }
}
