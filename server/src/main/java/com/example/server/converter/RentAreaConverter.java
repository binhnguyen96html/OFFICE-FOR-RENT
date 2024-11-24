package com.example.server.converter;

import com.example.server.dto.RentAreaDTO;
import com.example.server.entity.RentAreaEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RentAreaConverter {

    @Autowired
    private ModelMapper modelMapper;

    public RentAreaDTO convertEntityToDTO(RentAreaEntity rentAreaEntity) {
        RentAreaDTO result = modelMapper.map(rentAreaEntity, RentAreaDTO.class);
        return result;
    }
}
