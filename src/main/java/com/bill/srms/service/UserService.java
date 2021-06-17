package com.bill.srms.service;

import com.bill.srms.mapper.UserMapper;
import com.bill.srms.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
	@Autowired
	private UserMapper userMapper;

	public boolean login(User user){
		if (user.getUsername()==null||user.getPassword()==null) return false;
		return userMapper.selectOne(user)!=null;
	}
}
