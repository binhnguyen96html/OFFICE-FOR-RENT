package com.example.server.service;

import com.example.server.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> findAllUser();

    List<UserDTO> findAllUser_withAssignedBuildingStatus(Long buildingId);
}
