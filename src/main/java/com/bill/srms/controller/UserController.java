package com.bill.srms.controller;

import com.bill.srms.config.WebSecurityConfig;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.pojo.User;
import com.bill.srms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
    public RespBean loginPost(User user, HttpSession session, HttpServletResponse response) {
        System.out.println(System.getProperty("user.dir"));
        if (userService.login(user)) {
            session.setAttribute(WebSecurityConfig.SESSION_KEY, user);
            return RespBean.ok("登陆成功");
        }
        return RespBean.unprocessable("登录失败，用户名或密码错误");
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        // 移除session
        session.removeAttribute(WebSecurityConfig.SESSION_KEY);
        return "redirect:../login.html";
    }

    @PostMapping("/add")
    @ResponseBody
    public RespBean add(User user) {
        System.out.println(user);
        boolean result;
        try {
            result = userService.add(user);
        } catch (Exception e) {
            return RespBean.unprocessable("注册失败" + e.getMessage(), user);
        }
        if (result)
            return RespBean.ok("注册成功", user);
        return RespBean.unprocessable("注册失败", user);
    }

    @PutMapping("/update")
    @ResponseBody
    public RespBean update(User user) {
        boolean result;
        try {
            result = userService.update(user);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", user);
        return RespBean.unprocessable("修改失败");
    }

    @GetMapping("/checkIfUsernameExist")
    @ResponseBody
    public RespBean checkIdIfExist(String username) {
        boolean result;
        try {
            result = userService.getByUsername(username) == null;
        } catch (Exception e) {
            return RespBean.unprocessable("查询失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("合法");
        return RespBean.ok("不合法");
    }

}
