package com.example.server.converter;

import com.example.server.dto.BuildingDTO;
import com.example.server.dto.UserDTO;
import com.example.server.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class UserConverter {

    @Autowired
    private ModelMapper modelMapper;

    public UserDTO converterToDTO(UserEntity userEntity) {
        return modelMapper.map(userEntity, UserDTO.class);
    }

    public UserDTO converterToDTO_withAssignedBuildingChecked(UserEntity userEntity, Set<Long> staffIds) {
            UserDTO buildingDTO = modelMapper.map(userEntity, UserDTO.class);
        if(staffIds.contains(userEntity.getId())){
            buildingDTO.setAssignedBuidingChecked(true);
        }else{
            buildingDTO.setAssignedBuidingChecked(false);
        }
        return buildingDTO;
    }
}
