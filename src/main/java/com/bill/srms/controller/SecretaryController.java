package com.bill.srms.controller;

import com.bill.srms.pojo.Researcher;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.pojo.Room;
import com.bill.srms.pojo.Secretary;
import com.bill.srms.service.SecretaryService;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/secretary")
public class SecretaryController {
    @Autowired
    private SecretaryService secretaryService;

    @PostMapping("/add")
    public RespBean add(Secretary secretary) {
        boolean result;
        try {
            result = secretaryService.add(secretary);
        } catch (Exception e) {
            return RespBean.unprocessable("添加失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("添加成功", secretary);
        return RespBean.unprocessable("添加失败");
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        Secretary secretary;
        try {
            secretary=secretaryService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (secretary!=null)
            return RespBean.ok("获取成功",secretary);
        return RespBean.unprocessable("该秘书不存在");
    }

    @GetMapping("/getAll")
    private RespBean getAll(){
        HashMap<String, List<Secretary>> result = new HashMap<>();
        try {
            result.put("secretaryList", secretaryService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=secretaryService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Secretary secretary){
        boolean result;
        try {
            result = secretaryService.update(secretary);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", secretary);
        return RespBean.unprocessable("修改失败");
    }
}
