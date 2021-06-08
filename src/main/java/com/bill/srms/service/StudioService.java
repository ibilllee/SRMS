package com.bill.srms.service;

import com.bill.srms.mapper.StudioMapper;
import com.bill.srms.pojo.ResearchStudio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudioService
{
	@Autowired
	private StudioMapper studioMapper;

	public boolean addStudio(ResearchStudio studio){
		return studioMapper.insert(studio)==1;
	}
}
