package com.bill.srms.service;

import com.bill.srms.mapper.RoomMapper;
import com.bill.srms.pojo.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomMapper roomMapper;

    public boolean add(Room room) {
        return roomMapper.insertSelective(room) == 1;
    }

    public List<Room> getAll() {
        return roomMapper.selectAllWithStudio();
    }

    public boolean delete(Integer id) {
        return roomMapper.deleteByPrimaryKey(id) == 1;
    }

    public boolean update(Room room) {
        return roomMapper.updateByPrimaryKeySelective(room) == 1;
    }

    public List<Room> getByStudioId(Integer studioId) {
        return roomMapper.selectByStudioId(studioId);
    }
}
