package com.bill.srms.mapper;

import com.bill.srms.pojo.Achievement;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;

public interface AchievementMapper extends Mapper<Achievement> {

    @Select(" SELECT A.*,P.name as project_name " +
            " FROM achievement A " +
            " LEFT JOIN project P " +
            " ON A.project_id = P.id;")
    List<Achievement> selectAllWithProject();

    @Select(" SELECT * FROM achievement WHERE id = #{id} ")
    Achievement selectById(Integer id);
}
