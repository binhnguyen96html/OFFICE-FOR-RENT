package com.example.server.api;


import com.example.server.dto.CustomerDTO;
import com.example.server.dto.UserDTO;
import com.example.server.dto.request.AssignmentBuildingRequestDTO;
import com.example.server.dto.request.AssignmentCustomerRequestDTO;
import com.example.server.service.AssignmentCustomerService;
import com.example.server.service.CustomerService;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerAPI {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AssignmentCustomerService assignmentCustomerService;

    @GetMapping
    public List<CustomerDTO> findAllCustomers(){
        return customerService.findAllCustomers();
    }

    @GetMapping("/search")
    public List<CustomerDTO> findcustomers(@RequestParam(required = true) Map<String, Object> params){
        return customerService.findCustomers(params);
    }

    @GetMapping("/{id}")
    public CustomerDTO findCustomerById(@PathVariable("id") Long id){
        return customerService.findCustomerById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public CustomerDTO createCustomer(@RequestBody CustomerDTO customerDTO){
        return customerService.save(customerDTO);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/edit/{id}")
    public CustomerDTO createCustomer(@PathVariable long id,@RequestBody CustomerDTO customerDTO){
        customerDTO.setId(id);
        return customerService.save(customerDTO);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable long id){
        customerService.deleteCustomerById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/assign-staffs-to-customer")
    public void assignStaffsToCustomer(@RequestBody AssignmentCustomerRequestDTO assignmentCustomerRequestDTO) {
        assignmentCustomerService.updateAssignedStaffsToCustomer(assignmentCustomerRequestDTO);
    }

}
