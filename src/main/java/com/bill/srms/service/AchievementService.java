package com.bill.srms.service;

import com.bill.srms.mapper.AchievementMapper;
import com.bill.srms.pojo.Achievement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {
    @Autowired
    private AchievementMapper achievementMapper;

    public boolean add(Achievement studio) {
        return achievementMapper.insertSelective(studio) == 1;
    }

    public Achievement getById(Integer id) {
        return achievementMapper.selectById(id);
    }

    public List<Achievement> getAll() {
        return achievementMapper.selectAllWithProject();
    }

    public boolean delete(Integer id) {
        return achievementMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(Achievement studio) {
        return achievementMapper.updateByPrimaryKeySelective(studio) == 1;
    }
}
