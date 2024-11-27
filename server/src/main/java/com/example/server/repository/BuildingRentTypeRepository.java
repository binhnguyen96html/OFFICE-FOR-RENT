package com.example.server.repository;

import com.example.server.entity.BuildingRentTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingRentTypeRepository extends JpaRepository<BuildingRentTypeEntity, Long> {
}
