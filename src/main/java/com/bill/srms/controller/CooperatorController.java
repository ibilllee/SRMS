package com.bill.srms.controller;

import com.bill.srms.pojo.RespBean;
import com.bill.srms.pojo.Cooperator;
import com.bill.srms.service.CooperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RequestMapping("/cooperator")
@RestController
public class CooperatorController {
    @Autowired
    private CooperatorService cooperatorService;

    @PostMapping("/add")
    public RespBean add(Cooperator cooperator) {
        boolean result;
        try {
            result = cooperatorService.add(cooperator);
        } catch (Exception e) {
            return RespBean.unprocessable("添加失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("添加成功", cooperator);
        return RespBean.unprocessable("添加失败");
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        Cooperator cooperator;
        try {
            cooperator=cooperatorService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (cooperator!=null)
            return RespBean.ok("获取成功",cooperator);
        return RespBean.unprocessable("不存在");
    }

    @GetMapping("/getAll")
    private RespBean getAll(){
        HashMap<String, List<Cooperator>> result = new HashMap<>();
        try {
            result.put("cooperatorList", cooperatorService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=cooperatorService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Cooperator cooperator){
        boolean result;
        try {
            result = cooperatorService.update(cooperator);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", cooperator);
        return RespBean.unprocessable("修改失败");
    }
}
