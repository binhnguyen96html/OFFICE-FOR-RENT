package com.example.server.repository.custom.impl;

import com.example.server.entity.AssignmentBuildingEntity;
import com.example.server.entity.AssignmentCustomerEntity;
import com.example.server.repository.custom.AssignmentCustomerRepositoryCustom;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class AssignmentCustomerRepositoryImpl implements AssignmentCustomerRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void deleteAssignmentCustomer_ByCustomerId(Long customerId) {
        String sql = "DELETE FROM assignmentcustomer WHERE customerid = " + customerId;
        entityManager.createNativeQuery(sql, AssignmentCustomerEntity.class).executeUpdate();
    }

    @Override
    public List<AssignmentCustomerEntity> find_ByCustomerId(Long customerId) {
        String sql = "SELECT * FROM assignmentcustomer WHERE customerid = " + customerId;
        System.out.println("find_ByCustomerId sql: " + sql);
        Query query = entityManager.createNativeQuery(sql, AssignmentCustomerEntity.class);
        return query.getResultList();
    }

    @Override
    public void deleteAssignmentCustomer_ByStaffIdsIn(Long customerIds, Set<Long> staffIds) {
        if(staffIds == null || staffIds.isEmpty()){
            return;
        }
        String sql = "DELETE FROM assignmentcustomer WHERE customerid = " + customerIds;
        sql += " AND staffid IN (" + staffIds.stream().map(i -> i.toString()).collect(Collectors.joining(",")) + ")";
        System.out.println("deleteAssignmentCustomer_ByStaffIdsIn sql: " + sql);
        Query query = entityManager.createNativeQuery(sql, AssignmentCustomerEntity.class);
        query.executeUpdate();
    }

    @Override
    public void insertAssignmentCustomer(Long customerId, Set<Long> staffIds) {
        if (staffIds == null || staffIds.isEmpty()) {
            return;
        }

        String sql = "INSERT INTO assignmentcustomer(staffid, customerid) VALUES";
        sql += staffIds.stream().map(i -> "("+i+","+customerId+")").collect(Collectors.joining(","));
        System.out.println("insertAssignmentCustomer sql: " + sql);
        Query query = entityManager.createNativeQuery(sql, AssignmentCustomerEntity.class);
        query.executeUpdate();
    }

    @Override
    public void assign(Set<Long> deletedStaffIds, Set<Long> addedStaffIds, Long customerId) {
        deleteAssignmentCustomer_ByStaffIdsIn(customerId, deletedStaffIds);
        insertAssignmentCustomer(customerId, addedStaffIds);
    }
}
