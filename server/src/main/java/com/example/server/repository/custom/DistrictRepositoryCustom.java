package com.example.server.repository.custom;

import com.example.server.entity.DistrictEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Set;

@RequestMapping
public interface DistrictRepositoryCustom {
    List<DistrictEntity> findByIdIn(Set<Long> districtIds);
}
