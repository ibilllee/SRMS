package com.bill.srms.mapper;

import com.bill.srms.pojo.Room;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface RoomMapper extends Mapper<Room> {
    @Select(" SELECT R.id,address,acreage,studio_id,S.name AS studio_name " +
            " FROM room R, research_studio S " +
            " WHERE R.studio_id=S.id;")
    public List<Room> selectAll();
}
