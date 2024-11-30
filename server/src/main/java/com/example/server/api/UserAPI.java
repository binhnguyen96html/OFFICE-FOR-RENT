package com.example.server.api;

import com.example.server.dto.DistrictDTO;
import com.example.server.dto.UserDTO;
import com.example.server.dto.request.AssignmentBuildingRequestDTO;
import com.example.server.enums.DistrictEnum;
import com.example.server.service.AssignmentBuildingService;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserAPI {

    @Autowired
    private UserService userService;

    @Autowired
    private AssignmentBuildingService assignmentBuildingService;

    @GetMapping
    public List<UserDTO> getAllUsers() {
       return userService.findAllUser();
    }

    @GetMapping("/assigned-staffs/{buildingId}")
    public List<UserDTO> getAssignedStaffBy_BuildingId(@PathVariable Long buildingId) {
        return userService.findAllUser_withAssignedBuildingStatus(buildingId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/assign-staffs-to-building")
    public void assignStaffsToBuilding(@RequestBody AssignmentBuildingRequestDTO assignmentBuildingRequestDTO) {
        assignmentBuildingService.updateAssignedStaffsToBuilding(assignmentBuildingRequestDTO);
    }

}
