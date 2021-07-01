package com.bill.srms.service;

import com.bill.srms.mapper.ContributeMapper;
import com.bill.srms.pojo.Contribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContributeService {
    @Autowired
    private ContributeMapper contributeMapper;

    public boolean add(Contribute contribute) {
        return contributeMapper.insertSelective(contribute) == 1;
    }

    public Contribute getById(Integer id) {
        return contributeMapper.selectById(id);
    }

    public List<Contribute> getAll() {
        return contributeMapper.selectAllWithAchievementAndResearcher();
    }

    public boolean delete(Integer id) {
        return contributeMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(Contribute contribute) {
        return contributeMapper.updateByPrimaryKeySelective(contribute) == 1;
    }
}
