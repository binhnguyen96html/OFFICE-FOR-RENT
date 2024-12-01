package com.example.server.service.impl;

import com.example.server.converter.UserConverter;
import com.example.server.dto.UserDTO;
import com.example.server.entity.UserEntity;
import com.example.server.repository.UserRepository;
import com.example.server.repository.custom.UserRepositoryCustom;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRepositoryCustom userRepositoryCustom;
    @Autowired
    private UserConverter userConverter;

    @Override
    public List<UserDTO> findAllUser() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<UserDTO> users = userEntities.stream().map(u -> userConverter.converterToDTO(u)).collect(Collectors.toList());
        return users;
    }

    @Override
    public List<UserDTO> findAllUser_withAssignedBuildingStatus(Long buildingId) {
        Set<Long> assignedStaffs_Ids = userRepositoryCustom.findAssignedStaffs_ByBuildingId(buildingId)
                .stream().map(UserEntity::getId).collect(Collectors.toSet());
        List<UserEntity> allStaffs = userRepository.findAll();
        List<UserDTO> assignedStaffs = allStaffs.stream()
                .map(u -> userConverter.converterToDTO_withAssignedBuildingChecked(u, assignedStaffs_Ids))
                .collect(Collectors.toList());

        return assignedStaffs;
    }

    @Override
    public List<UserDTO> findAllUser_withAssignedCustomerStatus(Long customerId) {
        Set<Long> assignedStaffs_Ids = userRepositoryCustom.findAssignedStaffs_ByCustomerId(customerId)
                .stream().map(UserEntity::getId).collect(Collectors.toSet());
        List<UserEntity> allStaffs = userRepository.findAll();
        List<UserDTO> assignedStaffs = allStaffs.stream()
                .map(u -> userConverter.converterToDTO_withAssignedCustomerChecked(u, assignedStaffs_Ids))
                .collect(Collectors.toList());

        return assignedStaffs;
    }
}
