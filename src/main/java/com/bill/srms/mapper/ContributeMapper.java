package com.bill.srms.mapper;

import com.bill.srms.pojo.Contribute;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface ContributeMapper extends Mapper<Contribute> {
    @Select(" SELECT C.*,A.name as achievement_name,R.name as researcher_name " +
            " FROM contribute_to C " +
            " LEFT JOIN achievement A " +
            " ON C.achievement_id = A.id " +
            " LEFT JOIN researcher R " +
            " ON C.researcher_id = R.id; ")
    List<Contribute> selectAllWithAchievementAndResearcher();

    @Select(" SELECT * FROM contribute_to WHERE id = #{id} ")
    Contribute selectById(Integer id);
}
