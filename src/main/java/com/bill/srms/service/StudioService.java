package com.bill.srms.service;

import com.bill.srms.mapper.StudioMapper;
import com.bill.srms.pojo.ResearchStudio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudioService
{
	@Autowired
	private StudioMapper studioMapper;

	public boolean add(ResearchStudio studio){
		return studioMapper.insertSelective(studio)==1;
	}

	public ResearchStudio getById(Integer id){
		return studioMapper.selectByPrimaryKey(id);
	}

	public List<ResearchStudio> getAll(){
		return studioMapper.selectAllWithSecretaryAndResearcher();
	}

	public boolean delete(Integer id){
		return studioMapper.deleteByPrimaryKey(id)==1;
	}

	public boolean update(ResearchStudio studio){
		return studioMapper.updateByPrimaryKeySelective(studio)==1;
	}
}
