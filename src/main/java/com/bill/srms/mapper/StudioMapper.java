package com.bill.srms.mapper;

import com.bill.srms.pojo.ResearchStudio;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface StudioMapper extends Mapper<ResearchStudio>
{
    @Select(" SELECT ST.*,S.name as secretary_name,R.name as principal_name\n" +
            " FROM research_studio ST " +
            " LEFT JOIN secretary S " +
            " ON ST.secretary_id = S.id " +
            " LEFT JOIN researcher R " +
            " ON ST.principal_id = R.id;")
    List<ResearchStudio> selectAllWithSecretaryAndResearcher();
}
