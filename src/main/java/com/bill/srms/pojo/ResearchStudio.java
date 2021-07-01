package com.bill.srms.pojo;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "research_studio")
public class ResearchStudio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String researchDirection;
    private Integer principalId;
    private String principalName;
    private String pStartTime;
    private String pTerm;
    private Integer secretaryId;
    private String secretaryName;
}
