package com.bill.srms.controller;

import com.bill.srms.pojo.Achievement;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/achievement")
public class AchievementController {
    @Autowired
    private AchievementService achievementService;

    @PostMapping("/add")
    public RespBean add(Achievement achievement) {
        boolean result;
        try {
            result = achievementService.add(achievement);
        } catch (Exception e) {
            return RespBean.unprocessable("添加失败" + e.getMessage(), achievement);
        }
        if (result)
            return RespBean.ok("添加成功", achievement);
        return RespBean.unprocessable("添加失败", achievement);
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id) {
        Achievement achievement;
        try {
            achievement = achievementService.getById(id);
        } catch (Exception e) {
            return RespBean.unprocessable("获取失败");
        }
        if (achievement != null)
            return RespBean.ok("获取成功", achievement);
        return RespBean.unprocessable("不存在");
    }

    @GetMapping("/getAll")
    public RespBean getAll() {
        HashMap<String, List<Achievement>> result = new HashMap<>();
        try {
            result.put("achievementList", achievementService.getAll());
        } catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功", result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id) {
        boolean result;
        try {
            result = achievementService.delete(id);
        } catch (Exception e) {
            return RespBean.unprocessable("删除失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Achievement achievement) {
        boolean result;
        try {
            result = achievementService.update(achievement);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", achievement);
        return RespBean.unprocessable("修改失败");
    }

}
