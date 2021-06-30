package com.bill.srms.service;

import com.bill.srms.mapper.PerCooMapper;
import com.bill.srms.pojo.PerCoo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerCooService {
    @Autowired
    private PerCooMapper perCooMapper;

    public boolean add(PerCoo perCoo){
        return perCooMapper.insertSelective(perCoo)==1;
    }

    public PerCoo getById(Integer id){
        return perCooMapper.selectById(id);
    }

    public List<PerCoo> getAll(){
        return perCooMapper.selectAllWithPersonAndCooperator();
    }

    public boolean delete(Integer id){
        return perCooMapper.deleteByPrimaryKey(id)==1;
    }

    public boolean update(PerCoo perCoo){
        return perCooMapper.updateByPrimaryKeySelective(perCoo)==1;
    }
}
