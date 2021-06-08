package com.bill.srms.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "research_studio")
public class ResearchStudio
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;
	private String researchDirection;
	private Integer principalId;
	private String pStartTime;
	private String pTerm;
	private Integer secretaryId;
}
