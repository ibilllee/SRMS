package com.bill.srms.controller;

import com.bill.srms.pojo.JoinProject;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.JoinProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/joinProject")
public class JoinProjectController {
    @Autowired
    private JoinProjectService joinProjectService;

    @PostMapping("/add")
    public RespBean add(JoinProject joinProject) {
        boolean result;
        try {
            result = joinProjectService.add(joinProject);
        } catch (Exception e) {
            if (e instanceof UncategorizedSQLException) {
                UncategorizedSQLException exception = (UncategorizedSQLException) e;
                e.getMessage().contains("The project of this sub_topic is wrong");
                return RespBean.unprocessable("子课题不属于该项目", joinProject);
            }
            return RespBean.unprocessable("项目参与条目创建失败" + e.getMessage(), joinProject);
        }
        if (result)
            return RespBean.ok("项目参与条目创建成功", joinProject);
        return RespBean.unprocessable("项目参与条目创建失败", joinProject);
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id) {
        JoinProject joinProject;
        try {
            joinProject = joinProjectService.getById(id);
        } catch (Exception e) {
            return RespBean.unprocessable("获取失败");
        }
        if (joinProject != null)
            return RespBean.ok("获取成功", joinProject);
        return RespBean.unprocessable("该项目参与条目不存在");
    }

    @GetMapping("/getAll")
    public RespBean getAll() {
        HashMap<String, List<JoinProject>> result = new HashMap<>();
        try {
            result.put("joinProjectList", joinProjectService.getAll());
        } catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功", result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id) {
        boolean result;
        try {
            result = joinProjectService.delete(id);
        } catch (Exception e) {
            return RespBean.unprocessable("删除失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(JoinProject joinProject) {
        boolean result;
        try {
            result = joinProjectService.update(joinProject);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", joinProject);
        return RespBean.unprocessable("修改失败");
    }
}
