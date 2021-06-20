package com.bill.srms.service;

import com.bill.srms.mapper.ProjectMapper;
import com.bill.srms.pojo.Project;
import com.bill.srms.pojo.ResearchStudio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectMapper projectMapper;

    public boolean add(Project project) {
        return projectMapper.insertSelective(project) == 1;
    }

    public Project getById(Integer id) {
        return projectMapper.selectById(id);
    }

    public List<Project> getAll() {
        return projectMapper.selectAllWithResearcher();
    }

    public boolean delete(Integer id) {
        return projectMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(Project project) {
        return projectMapper.updateByPrimaryKeySelective(project) == 1;
    }
}