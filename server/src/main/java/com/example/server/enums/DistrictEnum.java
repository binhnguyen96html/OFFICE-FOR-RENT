package com.example.server.enums;

public enum DistrictEnum {
    Q1(1L, "Quận 1"),
    Q2(2L, "Quận 2"),
    Q4(3L, "Quận 4");

    private final Long id;
    private final String displayName;

    DistrictEnum(Long id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public Long getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }
}
