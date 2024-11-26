package com.example.server.api;

import com.example.server.dto.BuildingDTO;
import com.example.server.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/building")
public class BuildingAPI {

    @Autowired
    private BuildingService buildingService;

    @GetMapping
    public List<BuildingDTO> getBuildings() {
        return buildingService.getBuildings();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public BuildingDTO createBuilding(@RequestBody BuildingDTO buildingDTO) {
      return buildingService.save(buildingDTO);
    }

}
