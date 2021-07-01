package com.bill.srms.service;

import com.bill.srms.mapper.JoinProjectMapper;
import com.bill.srms.pojo.JoinProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JoinProjectService {
    @Autowired
    private JoinProjectMapper joinProjectMapper;

    public boolean add(JoinProject project) {
        return joinProjectMapper.insertSelective(project) == 1;
    }

    public JoinProject getById(Integer id) {
        return joinProjectMapper.selectById(id);
    }

    public List<JoinProject> getAll() {
        return joinProjectMapper.selectAllWithResearcherAndProject();
    }

    public boolean delete(Integer id) {
        return joinProjectMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(JoinProject project) {
        return joinProjectMapper.updateByPrimaryKeySelective(project) == 1;
    }
}
