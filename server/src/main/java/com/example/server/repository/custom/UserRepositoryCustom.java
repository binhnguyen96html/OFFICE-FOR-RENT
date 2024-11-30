package com.example.server.repository.custom;


import com.example.server.entity.AssignmentBuildingEntity;
import com.example.server.entity.UserEntity;

import java.util.List;

public interface UserRepositoryCustom {
    List<UserEntity> findAssignedStaffs_ByBuildingId(Long buildingId);
}
