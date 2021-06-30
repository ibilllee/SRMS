package com.bill.srms.controller;

import com.bill.srms.pojo.Person;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/person")
public class PersonController {
    @Autowired
    private PersonService cersonService;

    @PostMapping("/add")
    public RespBean add(Person cerson) {
        boolean result;
        try {
            result = cersonService.add(cerson);
        } catch (Exception e) {
            return RespBean.unprocessable("添加失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("添加成功", cerson);
        return RespBean.unprocessable("添加失败");
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        Person cerson;
        try {
            cerson=cersonService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (cerson!=null)
            return RespBean.ok("获取成功",cerson);
        return RespBean.unprocessable("不存在");
    }

    @GetMapping("/getAll")
    private RespBean getAll(){
        HashMap<String, List<Person>> result = new HashMap<>();
        try {
            result.put("cersonList", cersonService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=cersonService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Person cerson){
        boolean result;
        try {
            result = cersonService.update(cerson);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", cerson);
        return RespBean.unprocessable("修改失败");
    }
}
