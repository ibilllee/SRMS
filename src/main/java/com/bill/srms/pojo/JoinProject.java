package com.bill.srms.pojo;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "join_project")
public class JoinProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer researcherId;
    private String researcherName;
    private Integer projectId;
    private String projectName;
    private Integer subTopicId;
    private String joinTime;
    private String workload;
    private String fund;
}
