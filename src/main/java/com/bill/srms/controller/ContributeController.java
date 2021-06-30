package com.bill.srms.controller;

import com.bill.srms.pojo.Contribute;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.ContributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/contribute")
public class ContributeController {
    @Autowired
    private ContributeService contributeService;

    @PostMapping("/add")
    public RespBean add(Contribute contribute){
        boolean result ;
        try {
            result=contributeService.add(contribute);
        } catch (Exception e){
            return RespBean.unprocessable("添加失败"+e.getMessage(), contribute);
        }
        if (result)
            return RespBean.ok("添加成功", contribute);
        return RespBean.unprocessable("添加失败", contribute);
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        Contribute contribute;
        try {
            contribute=contributeService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (contribute!=null)
            return RespBean.ok("获取成功",contribute);
        return RespBean.unprocessable("不存在");
    }

    @GetMapping("/getAll")
    public RespBean getAll(){
        HashMap<String, List<Contribute>> result = new HashMap<>();
        try {
            result.put("contributeList", contributeService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=contributeService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Contribute contribute){
        boolean result;
        try {
            result = contributeService.update(contribute);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", contribute);
        return RespBean.unprocessable("修改失败");
    }
}
