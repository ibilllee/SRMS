package com.bill.srms.mapper;

import com.bill.srms.pojo.Contribute;
import com.bill.srms.pojo.PerCoo;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface PerCooMapper extends Mapper<PerCoo> {
    @Select(" SELECT PC.*,P.name as person_name,C.name as cooperator_name " +
            " FROM per_coo PC " +
            " LEFT JOIN person P " +
            " ON PC.person_id = P.id " +
            " LEFT JOIN cooperator C " +
            " ON PC.cooperator_id = C.id; ")
    List<PerCoo> selectAllWithPersonAndCooperator();

    @Select(" SELECT * FROM contribute_to WHERE id = #{id} ")
    PerCoo selectById(Integer id);
}
