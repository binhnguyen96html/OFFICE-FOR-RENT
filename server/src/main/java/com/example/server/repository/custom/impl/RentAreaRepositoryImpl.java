package com.example.server.repository.custom.impl;

import com.example.server.entity.RentAreaEntity;
import com.example.server.repository.custom.RentAreaRepositoryCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class RentAreaRepositoryImpl implements RentAreaRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<RentAreaEntity> findByBuilding_Id(Long buildingId) {
        String sql = "From RentAreaEntity where building2.id="+buildingId+"";
        Query query = entityManager.createQuery(sql, RentAreaEntity.class);

        return query.getResultList();
    }

    @Override
    public void deleteByBuilding_Id(Long buildingId) {
            String deleteQuery = "DELETE FROM rentarea WHERE buildingid = " + buildingId;
            System.out.println("deletedRentAreaIds SQL: " + deleteQuery);
            Query query1 = entityManager.createNativeQuery(deleteQuery, RentAreaEntity.class);
            query1.executeUpdate(); // Execute the delete query
    }

    @Override
    public void updateRentArea(List<Long> deletedRentAreaIds, List<RentAreaEntity> addedRentAreaEntities) {
        EntityTransaction transaction = null;

       try{
           transaction = entityManager.getTransaction();
           transaction.begin();

           // Delete rent areas
           if (!deletedRentAreaIds.isEmpty()) {
               String deleteQuery = "DELETE FROM rentarea WHERE buildingid IN (" +
                       deletedRentAreaIds.stream().map(String::valueOf).collect(Collectors.joining(",")) +
                       ")";
               System.out.println("deletedRentAreaIds SQL: " + deleteQuery);
               Query query1 = entityManager.createNativeQuery(deleteQuery, RentAreaEntity.class);
               query1.executeUpdate(); // Execute the delete query
           }

           // Insert new rent areas
           if (!addedRentAreaEntities.isEmpty()) {
               StringBuilder insertQuery = new StringBuilder("INSERT INTO rentarea (value, buildingid) VALUES ");
               insertQuery.append(
                       addedRentAreaEntities.stream()
                               .map(r -> "(" + r.getValue() + "," + r.getBuilding2().getId() + ")")
                               .collect(Collectors.joining(","))
               );
               System.out.println("addedRentAreaEntities SQL: " + insertQuery);
               Query query2 = entityManager.createNativeQuery(insertQuery.toString(), RentAreaEntity.class);
               query2.executeUpdate(); // Execute the insert query
           }

           transaction.commit(); // Commit the transaction if both queries succeed
       }catch (Exception e) {
           if (transaction != null && transaction.isActive()) {
               transaction.rollback(); // Rollback the transaction on failure
           }
           e.printStackTrace(); // Log the exception
           throw new RuntimeException("Failed to update rent areas.", e);
       } finally {
           if (entityManager != null) {
               entityManager.close(); // Close the EntityManager
           }
       }

    }

}
