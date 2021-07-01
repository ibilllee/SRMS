package com.bill.srms.controller;

import com.bill.srms.pojo.PerCoo;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.PerCooService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/perCoo")
public class PerCooController {
    @Autowired
    private PerCooService perCooService;

    @PostMapping("/add")
    public RespBean add(PerCoo perCoo) {
        boolean result;
        try {
            result = perCooService.add(perCoo);
        } catch (Exception e) {
            if (e instanceof UncategorizedSQLException) {
                UncategorizedSQLException exception = (UncategorizedSQLException) e;
                e.getMessage().contains("The cooperator pricipal has already exist");
                return RespBean.unprocessable("项目负责人已存在", perCoo);
            }
            return RespBean.unprocessable("添加失败" + e.getMessage(), perCoo);
        }
        if (result)
            return RespBean.ok("添加成功", perCoo);
        return RespBean.unprocessable("添加失败", perCoo);
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id) {
        PerCoo perCoo;
        try {
            perCoo = perCooService.getById(id);
        } catch (Exception e) {
            return RespBean.unprocessable("获取失败");
        }
        if (perCoo != null)
            return RespBean.ok("获取成功", perCoo);
        return RespBean.unprocessable("不存在");
    }

    @GetMapping("/getAll")
    public RespBean getAll() {
        HashMap<String, List<PerCoo>> result = new HashMap<>();
        try {
            result.put("perCooList", perCooService.getAll());
        } catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功", result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id) {
        boolean result;
        try {
            result = perCooService.delete(id);
        } catch (Exception e) {
            return RespBean.unprocessable("删除失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(PerCoo perCoo) {
        boolean result;
        try {
            result = perCooService.update(perCoo);
        } catch (Exception e) {
            if (e instanceof UncategorizedSQLException) {
                UncategorizedSQLException exception = (UncategorizedSQLException) e;
                e.getMessage().contains("The cooperator pricipal has already exist");
                return RespBean.unprocessable("项目负责人已存在", perCoo);
            }
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", perCoo);
        return RespBean.unprocessable("修改失败");
    }
}
