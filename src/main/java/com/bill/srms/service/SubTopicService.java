package com.bill.srms.service;

import com.bill.srms.mapper.SubTopicMapper;
import com.bill.srms.pojo.SubTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTopicService {
    @Autowired
    private SubTopicMapper subTopicMapper;

    public boolean add(SubTopic subTopic) {
        return subTopicMapper.insertSelective(subTopic) == 1;
    }

    public SubTopic getById(Integer id) {
        return subTopicMapper.selectById(id);
    }

    public List<SubTopic> getAll() {
        return subTopicMapper.selectAllWithProjectAndResearcher();
    }

    public boolean delete(Integer id) {
        return subTopicMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(SubTopic subTopic) {
        return subTopicMapper.updateByPrimaryKeySelective(subTopic) == 1;
    }

    public List<SubTopic> getByProjectId(Integer projectId) {
        return subTopicMapper.selectByProjectId(projectId);
    }
}
