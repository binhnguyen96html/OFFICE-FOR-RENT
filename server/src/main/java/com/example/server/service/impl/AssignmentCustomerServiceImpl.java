package com.example.server.service.impl;

import com.example.server.dto.request.AssignmentCustomerRequestDTO;
import com.example.server.repository.custom.AssignmentCustomerRepositoryCustom;
import com.example.server.service.AssignmentCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AssignmentCustomerServiceImpl implements AssignmentCustomerService {

    @Autowired
    private AssignmentCustomerRepositoryCustom assignmentCustomerRepositoryCustom;

    @Override
    @Transactional
    public void updateAssignedStaffsToCustomer(AssignmentCustomerRequestDTO assignmentCustomerRequestDTO) {
        Set<Long> newStaffIds = assignmentCustomerRequestDTO.getStaffIds();
        Long customerId = assignmentCustomerRequestDTO.getCustomerId();

        Set<Long> currentAssignedStaffIds = assignmentCustomerRepositoryCustom.find_ByCustomerId(customerId)
                .stream()
                .map(a -> a.getStaffId()).collect(Collectors.toSet());

        Set<Long> deletedStaffIds = findItemOfSourceButNotInTarget(currentAssignedStaffIds, newStaffIds);
        Set<Long> addedStaffIds = findItemOfSourceButNotInTarget(newStaffIds, currentAssignedStaffIds);

        assignmentCustomerRepositoryCustom.assign(deletedStaffIds, addedStaffIds, customerId);
    }

    private Set<Long> findItemOfSourceButNotInTarget(Set<Long> source, Set<Long> target) {
        Set<Long> result = new HashSet<>();
        Long id = null;

        for (Long srcId : source) {
            for (Long targetId : target) {
                if (Objects.equals(targetId, srcId)) {
                    id = srcId;
                    break;
                }
                id = null;
            }
            if (null == id) {
                result.add(srcId);
            }
        }

        return result;
    }
}
