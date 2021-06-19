package com.bill.srms.service;

import com.bill.srms.mapper.ResearcherMapper;
import com.bill.srms.pojo.Researcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResearcherService {
    @Autowired
    private ResearcherMapper researcherMapper;

    public boolean add(Researcher researcher){
        return researcherMapper.insertSelective(researcher)==1;
    }

    public List<Researcher> getAll(){
        return researcherMapper.selectAll();
    }

    public boolean delete(Integer id){
        return researcherMapper.deleteByPrimaryKey(id)==1;
    }

    public boolean update(Researcher researcher){
        return researcherMapper.updateByPrimaryKeySelective(researcher)==1;
    }
}
