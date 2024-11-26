package com.example.server.api;

import com.example.server.dto.DistrictDTO;
import com.example.server.enums.DistrictEnum;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/district")
public class DistrictAPI {


    @GetMapping
    public List<DistrictDTO> getDistricts() {
        return Arrays.stream(DistrictEnum.values())
                .map(district -> new DistrictDTO(district.getId(), district.name(), district.getDisplayName()))
                .collect(Collectors.toList());
    }

}
