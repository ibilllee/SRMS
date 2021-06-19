package com.bill.srms.mapper;

import com.bill.srms.pojo.Researcher;
import com.bill.srms.pojo.Secretary;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

public interface SecretaryMapper extends Mapper<Secretary> {
    @Select(" SELECT * FROM secretary WHERE id = #{id} ")
    Secretary selectById(Integer id);
}
