package com.bill.srms.service;

import com.bill.srms.mapper.CooperatorMapper;
import com.bill.srms.pojo.Cooperator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CooperatorService {
    @Autowired
    private CooperatorMapper cooperatorMapper;

    public boolean add(Cooperator cooperator){
        return cooperatorMapper.insertSelective(cooperator)==1;
    }

    public List<Cooperator> getAll(){
        return cooperatorMapper.selectAll();
    }

    public boolean delete(Integer id){
        return cooperatorMapper.deleteByPrimaryKey(id)==1;
    }

    public boolean update(Cooperator cooperator){
        return cooperatorMapper.updateByPrimaryKeySelective(cooperator)==1;
    }

    public Cooperator getById(Integer id) {
        return cooperatorMapper.selectById(id);
    }
    
}
