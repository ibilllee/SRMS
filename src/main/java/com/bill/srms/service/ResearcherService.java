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
        return researcherMapper.selectAllWithStudio();
    }

    public boolean delete(Integer id){
        return researcherMapper.deleteByPrimaryKey(id)==1;
    }

    public boolean update(Researcher researcher){
        return researcherMapper.updateByPrimaryKeySelective(researcher)==1;
    }

    public List<Researcher> getByStudioId(Integer studioId) {
        return researcherMapper.selectByStudioId(studioId);
    }

    public Researcher getById(Integer id) {
        return researcherMapper.selectById(id);
    }

    public List<Researcher> getByProjectId(Integer projectId) {
        return researcherMapper.selectByProjectId(projectId);
    }

    public List<Researcher> getBySubTopicId(Integer subTopicId) {
        return researcherMapper.selectBySubTopic(subTopicId);
    }

    public List<Researcher> getByAchievementId(Integer achievementId) {
        return researcherMapper.selectByAchievementId(achievementId);
    }
}
