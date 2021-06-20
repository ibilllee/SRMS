package com.bill.srms.mapper;

import com.bill.srms.pojo.JoinProject;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface JoinProjectMapper extends Mapper<JoinProject> {
    @Select(" SELECT JP.*,R.name as researcher_name,P.name as project_name" +
            " FROM join_project JP " +
            " LEFT JOIN researcher R " +
            " ON JP.researcher_id = R.id " +
            " LEFT JOIN project P " +
            " ON JP.project_id = P.id; ")
    List<JoinProject> selectAllWithResearcherAndProject();

    @Select(" SELECT * FROM join_project WHERE id = #{id} ")
    JoinProject selectById(Integer id);
}
