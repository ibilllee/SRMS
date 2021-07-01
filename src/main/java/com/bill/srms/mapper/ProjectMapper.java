package com.bill.srms.mapper;

import com.bill.srms.pojo.Project;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface ProjectMapper extends Mapper<Project> {
    @Select(" SELECT P.*,R.name as principal_name\n" +
            " FROM project P " +
            " LEFT JOIN researcher R " +
            " ON P.principal_id = R.id;")
    List<Project> selectAllWithResearcher();

    @Select(" SELECT * FROM project WHERE id = #{id} ")
    Project selectById(Integer id);
}
