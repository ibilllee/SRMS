package com.bill.srms.service;

import com.bill.srms.mapper.WithOtherMapper;
import com.bill.srms.pojo.WithOther;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WithOtherService {
    @Autowired
    private WithOtherMapper withOtherMapper;

    public boolean add(WithOther withOther) {
        return withOtherMapper.insertSelective(withOther) == 1;
    }

    public WithOther getById(Integer id) {
        return withOtherMapper.selectById(id);
    }

    public List<WithOther> getAll() {
        return withOtherMapper.selectAllWithProjectAndCooperator();
    }

    public boolean delete(Integer id) {
        return withOtherMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(WithOther withOther) {
        return withOtherMapper.updateByPrimaryKeySelective(withOther) == 1;
    }
}
