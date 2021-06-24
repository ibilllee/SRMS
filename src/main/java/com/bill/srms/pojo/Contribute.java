package com.bill.srms.pojo;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "contribute_to")
public class Contribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer researcherId;
    private String researcherName;
    private Integer achievementId;
    private String achievementName;
}
