package com.bill.srms.service;

import com.bill.srms.mapper.SecretaryMapper;
import com.bill.srms.pojo.Secretary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecretaryService {
    @Autowired
    private SecretaryMapper secretaryMapper;

    public boolean add(Secretary secretary){
        return secretaryMapper.insertSelective(secretary)==1;
    }

    public List<Secretary> getAll(){
        return secretaryMapper.selectAll();
    }

    public boolean delete(Integer id){
        return secretaryMapper.deleteByPrimaryKey(id)==1;
    }

    public boolean update(Secretary secretary){
        return secretaryMapper.updateByPrimaryKeySelective(secretary)==1;
    }


}
