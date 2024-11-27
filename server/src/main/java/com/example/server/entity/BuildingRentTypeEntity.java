package com.example.server.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="buildingrenttype")
public class BuildingRentTypeEntity extends BaseEntity {

    @Column(name="buildingid")
    private Long buildingId;

    @Column(name = "renttypeid")
    private Long rentTypeId;

    public Long getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Long buildingId) {
        this.buildingId = buildingId;
    }

    public Long getRentTypeId() {
        return rentTypeId;
    }

    public void setRentTypeId(Long rentTypeId) {
        this.rentTypeId = rentTypeId;
    }
}
