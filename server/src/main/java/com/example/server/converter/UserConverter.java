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
            UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
        if(staffIds.contains(userEntity.getId())){
            userDTO.setAssignedBuidingChecked(true);
        }else{
            userDTO.setAssignedBuidingChecked(false);
        }
        return userDTO;
    }

    public UserDTO converterToDTO_withAssignedCustomerChecked(UserEntity userEntity, Set<Long> staffIds) {
        UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
        if(staffIds.contains(userEntity.getId())){
            userDTO.setAssignedCustomerChecked(true);
        }else{
            userDTO.setAssignedCustomerChecked(false);
        }
        return userDTO;
    }
}
