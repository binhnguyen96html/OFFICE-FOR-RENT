package com.example.server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="user")
public class UserEntity extends BaseEntity {

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="fullname")
    private String fullname;

    @Column(name="phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    private String status;

    @ManyToMany(mappedBy = "users3")
    private List<BuildingEntity> building3 = new ArrayList<>();

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<BuildingEntity> getBuilding3() {
        return building3;
    }

    public void setBuilding3(List<BuildingEntity> building3) {
        this.building3 = building3;
    }
}
