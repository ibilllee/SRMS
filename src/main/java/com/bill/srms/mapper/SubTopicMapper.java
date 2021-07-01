package com.bill.srms.mapper;

import com.bill.srms.pojo.SubTopic;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface SubTopicMapper extends Mapper<SubTopic> {
    @Select(" SELECT ST.*,P.name as project_name,R.name as principal_name" +
            " FROM sub_topic ST " +
            " LEFT JOIN project P " +
            " ON ST.project_id = P.id " +
            " LEFT JOIN researcher R " +
            " ON ST.principal_id = R.id;")
    List<SubTopic> selectAllWithProjectAndResearcher();

    @Select(" SELECT * FROM sub_topic WHERE id = #{id} ")
    SubTopic selectById(Integer id);

    @Select(" SELECT ST.*,P.name as project_name,R.name as principal_name" +
            " FROM sub_topic ST " +
            " LEFT JOIN project P " +
            " ON ST.project_id = P.id " +
            " LEFT JOIN researcher R " +
            " ON ST.principal_id = R.id " +
            " WHERE ST.project_id = #{projectId}; ")
    List<SubTopic> selectByProjectId(Integer projectId);
}
