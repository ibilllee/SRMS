package com.bill.srms.controller;

import com.bill.srms.pojo.WithOther;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.WithOtherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/withOther")
public class WithOtherController {
    @Autowired
    private WithOtherService withOtherService;

    @PostMapping("/add")
    public RespBean add(WithOther withOther){
        boolean result ;
        try {
            result=withOtherService.add(withOther);
        } catch (Exception e){
            return RespBean.unprocessable("添加失败"+e.getMessage(), withOther);
        }
        if (result)
            return RespBean.ok("添加成功", withOther);
        return RespBean.unprocessable("添加失败", withOther);
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        WithOther withOther;
        try {
            withOther=withOtherService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (withOther!=null)
            return RespBean.ok("获取成功",withOther);
        return RespBean.unprocessable("不存在");
    }

    @GetMapping("/getAll")
    public RespBean getAll(){
        HashMap<String, List<WithOther>> result = new HashMap<>();
        try {
            result.put("withOtherList", withOtherService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=withOtherService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(WithOther withOther){
        boolean result;
        try {
            result = withOtherService.update(withOther);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", withOther);
        return RespBean.unprocessable("修改失败");
    }
}
