package com.example.server.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="assignmentbuilding")
public class AssignmentBuildingEntity extends BaseEntity {

    @Column(name="staffid")
    private Long staffId;

    @Column(name = "buildingid")
    private Long buildingid;

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public Long getBuildingid() {
        return buildingid;
    }

    public void setBuildingid(Long buildingid) {
        this.buildingid = buildingid;
    }
}
