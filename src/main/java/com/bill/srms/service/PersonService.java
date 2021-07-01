package com.bill.srms.service;

import com.bill.srms.mapper.PersonMapper;
import com.bill.srms.pojo.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    @Autowired
    private PersonMapper personMapper;

    public boolean add(Person person) {
        return personMapper.insertSelective(person) == 1;
    }

    public List<Person> getAll() {
        return personMapper.selectAll();
    }

    public boolean delete(Integer id) {
        return personMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(Person person) {
        return personMapper.updateByPrimaryKeySelective(person) == 1;
    }

    public Person getById(Integer id) {
        return personMapper.selectById(id);
    }
}
