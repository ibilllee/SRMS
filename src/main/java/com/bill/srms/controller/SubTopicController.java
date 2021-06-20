package com.bill.srms.controller;

import com.bill.srms.pojo.Researcher;
import com.bill.srms.pojo.SubTopic;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.SubTopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/subTopic")
public class SubTopicController {
    @Autowired
    private SubTopicService subTopicService;
    
    @PostMapping("/add")
    public RespBean add(SubTopic subTopic){
        boolean result ;
        try {
            result=subTopicService.add(subTopic);
        } catch (Exception e){
            return RespBean.unprocessable("子课题创建失败"+e.getMessage(), subTopic);
        }
        if (result)
            return RespBean.ok("子课题创建成功", subTopic);
        return RespBean.unprocessable("子课题创建失败", subTopic);
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        SubTopic subTopic;
        try {
            subTopic=subTopicService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (subTopic!=null)
            return RespBean.ok("获取成果",subTopic);
        return RespBean.unprocessable("该子课题不存在");
    }

    @GetMapping("/getAll")
    public RespBean getAll(){
        HashMap<String, List<SubTopic>> result = new HashMap<>();
        try {
            result.put("subTopicList", subTopicService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @GetMapping("/getByProjectId/{projectId}")
    private RespBean getByProjectId(@PathVariable Integer projectId){
        HashMap<String, List<SubTopic>> result = new HashMap<>();
        try {
            result.put("subTopicList", subTopicService.getByProjectId(projectId));
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=subTopicService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(SubTopic subTopic){
        boolean result;
        try {
            result = subTopicService.update(subTopic);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", subTopic);
        return RespBean.unprocessable("修改失败");
    }
}
