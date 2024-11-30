package com.example.server.api;

import com.example.server.dto.BuildingDTO;
import com.example.server.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/buildings")
public class BuildingAPI {
    @GetMapping("/{id}")
    public Optional<BuildingDTO> getBuildingById(@PathVariable Long id) {
        return buildingService.findById(id);
    }
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

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public BuildingDTO updateBuilding(@PathVariable Long id, @RequestBody BuildingDTO buildingDTO) {
        buildingDTO.setId(id);
        return buildingService.save(buildingDTO);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public void deleteBuilding(@PathVariable Long id) {
        buildingService.deleteBuildingById(id);
    }

}
