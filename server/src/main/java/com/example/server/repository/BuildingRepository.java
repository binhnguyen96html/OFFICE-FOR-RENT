package com.example.server.repository;


import com.example.server.entity.BuildingEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BuildingRepository extends JpaRepository<BuildingEntity, Long> {
}
