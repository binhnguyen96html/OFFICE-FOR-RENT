package com.example.server.entity;

import javax.persistence.*;

@Entity
@Table(name="rentarea")
public class RentAreaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JoinColumn(name="buildingid")
    private BuildingEntity building2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public BuildingEntity getBuilding2() {
        return building2;
    }

    public void setBuilding2(BuildingEntity building2) {
        this.building2 = building2;
    }
}
