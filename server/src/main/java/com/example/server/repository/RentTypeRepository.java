package com.example.server.repository;

import com.example.server.entity.RentTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RentTypeRepository extends JpaRepository<RentTypeEntity, Long> {
    Optional<RentTypeEntity> findByCode(String code);
}
