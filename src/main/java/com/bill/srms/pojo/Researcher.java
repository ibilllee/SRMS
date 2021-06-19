package com.bill.srms.pojo;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "researcher")
public class Researcher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String gender;
    private String title;
    private Integer age;
    private String researchDirection;
    private Integer studioId;
    private String studioName;
}
