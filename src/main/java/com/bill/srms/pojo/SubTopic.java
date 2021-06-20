package com.bill.srms.pojo;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "sub_topic")
public class SubTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String finishTime;
    private String fund;
    private String techIndex;
    private Integer principalId;
    private Integer projectId;
}
