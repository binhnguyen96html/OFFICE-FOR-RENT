package com.example.server.dto;

public class UserDTO {

    private Long id;
    private String username;
    private String password;
    private String fullname;
    private String phone;
    private String email;
    private String status;

    private boolean assignedBuidingChecked;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public boolean isAssignedBuidingChecked() {
        return assignedBuidingChecked;
    }

    public void setAssignedBuidingChecked(boolean assignedBuidingChecked) {
        this.assignedBuidingChecked = assignedBuidingChecked;
    }
}
