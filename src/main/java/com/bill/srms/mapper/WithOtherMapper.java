package com.bill.srms.mapper;

import com.bill.srms.pojo.WithOther;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface WithOtherMapper extends Mapper<WithOther> {
    @Select(" SELECT W.*,P.name as project_name,C.name as cooperator_name " +
            " FROM with_other W " +
            " LEFT JOIN project P " +
            " ON W.project_id = P.id " +
            " LEFT JOIN cooperator C " +
            " ON W.cooperator_id = C.id; ")
    List<WithOther> selectAllWithProjectAndCooperator();

    @Select(" SELECT * FROM contribute_to WHERE id = #{id} ")
    WithOther selectById(Integer id);
}
