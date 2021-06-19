package com.bill.srms.mapper;

import com.bill.srms.pojo.Room;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface RoomMapper extends Mapper<Room> {
    @Select(" SELECT R.*,S.name AS studio_name " +
            " FROM room R LEFT JOIN research_studio S " +
            " ON R.studio_id=S.id;")
    List<Room> selectAllWithStudio();

    @Select(" SELECT R.*,S.name AS studio_name " +
            " FROM room R LEFT JOIN research_studio S " +
            " ON R.studio_id=S.id " +
            " WHERE S.id = #{studioId}; ")
    List<Room> selectByStudioId(Integer studioId);
}
