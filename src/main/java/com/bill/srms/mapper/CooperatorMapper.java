package com.bill.srms.mapper;

import com.bill.srms.pojo.Cooperator;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

public interface CooperatorMapper extends Mapper<Cooperator> {
    @Select(" SELECT * FROM cooperator WHERE id = #{id} ")
    Cooperator selectById(Integer id);
}
