package com.example.server.api;

import com.example.server.dto.BuildingDTO;
import com.example.server.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/building")
public class BuildingAPI {

    @Autowired
    private BuildingService buildingService;

    @GetMapping
    public List<BuildingDTO> getBuildings() {
        return buildingService.getBuildings();
    }

    @GetMapping("/search")
    public List<BuildingDTO> findBuildings(
            @RequestParam(required = false) Map<String, Object> params
    ) {
        return buildingService.findBuildings(params);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public BuildingDTO createBuilding(@RequestBody BuildingDTO buildingDTO) {
      return buildingService.save(buildingDTO);
    }

}
