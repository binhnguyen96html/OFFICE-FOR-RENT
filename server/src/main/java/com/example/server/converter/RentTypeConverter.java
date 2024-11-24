package com.example.server.converter;

import com.example.server.dto.RentTypeDTO;
import com.example.server.entity.RentTypeEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RentTypeConverter {

    @Autowired
    private ModelMapper modelMapper;

    public RentTypeDTO convertEntityToDTO(RentTypeEntity rentTypeEntity) {
        RentTypeDTO dto = modelMapper.map(rentTypeEntity, RentTypeDTO.class);
        return dto;
    }
}
