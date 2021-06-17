package com.bill.srms.controller;

import com.bill.srms.config.WebSecurityConfig;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.pojo.User;
import com.bill.srms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    // @GetMapping("/goHome")
    // public String index(@SessionAttribute("user") User user, Model model) {
    //     model.addAttribute("name", user.getUsername());
    //     return "redirect:../index.html";
    // }


    @PostMapping("/loginPost")
    @ResponseBody
    public  RespBean loginPost(User user, HttpSession session) {
        System.out.println(System.getProperty("user.dir"));
            if(userService.login(user)){
                session.setAttribute(WebSecurityConfig.SESSION_KEY,user);
                return RespBean.ok("登陆成功");
            }
        return RespBean.unprocessable("登录失败，用户名或密码错误");
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        // 移除session
        session.removeAttribute(WebSecurityConfig.SESSION_KEY);
        return "redirect:../index";
    }


}
