package com.example.server.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "renttype")
public class RentTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="code")
    private String code;

    @Column(name="name")
    private String name;

    @ManyToMany(mappedBy = "renttypes2")
    private List<BuildingEntity> buildings2 = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BuildingEntity> getBuildings2() {
        return buildings2;
    }

    public void setBuildings2(List<BuildingEntity> buildings2) {
        this.buildings2 = buildings2;
    }
}
