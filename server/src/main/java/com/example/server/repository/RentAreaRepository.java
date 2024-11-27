package com.example.server.repository;

import com.example.server.entity.RentAreaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RentAreaRepository extends JpaRepository<RentAreaEntity, Long> {
}
