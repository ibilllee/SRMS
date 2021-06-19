package com.bill.srms.mapper;

import com.bill.srms.pojo.Researcher;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface ResearcherMapper extends Mapper<Researcher> {
    @Select("SELECT R.*,S.name as studio_name\n" +
            "FROM researcher R LEFT JOIN research_studio S\n" +
            "ON R.studio_id = S.id;")
    List<Researcher> selectAll();
}
