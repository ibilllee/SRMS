package com.bill.srms.mapper;

import com.bill.srms.pojo.User;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import tk.mybatis.mapper.common.Mapper;

public interface UserMapper extends Mapper<User> {
    @Update(" UPDATE user SET password = #{password} WHERE username = #{username} ")
    Integer updateByUsername(User user);

    @Select(" SELECT * FROM user WHERE username = #{username}")
    User selectByUsername(String username);
}
