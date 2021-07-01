package com.bill.srms.mapper;

import com.bill.srms.pojo.Person;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

public interface PersonMapper extends Mapper<Person> {
    @Select(" SELECT * FROM person WHERE id = #{id} ")
    Person selectById(Integer id);
}
