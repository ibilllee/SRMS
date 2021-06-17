package com.bill.srms.controller;

import com.bill.srms.pojo.RespBean;
import com.bill.srms.pojo.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @PostMapping("/login")
    public RespBean login(User user){
        System.out.println(user);
        return RespBean.ok("登陆成功");
    }
}
