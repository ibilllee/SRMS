package com.bill.srms.controller;

import com.bill.srms.pojo.Project;
import com.bill.srms.pojo.ResearchStudio;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @PostMapping("/add")
    public RespBean add(Project project){
        boolean result ;
        try {
            result=projectService.add(project);
        } catch (Exception e){
            return RespBean.unprocessable("科研项目创建失败"+e.getMessage(), project);
        }
        if (result)
            return RespBean.ok("科研项目创建成功", project);
        return RespBean.unprocessable("科研项目创建失败", project);
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        Project project;
        try {
            project=projectService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (project!=null)
            return RespBean.ok("获取成功",project);
        return RespBean.unprocessable("该科研项目不存在");
    }

    @GetMapping("/getAll")
    public RespBean getAll(){
        HashMap<String, List<Project>> result = new HashMap<>();
        try {
            result.put("projectList", projectService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=projectService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Project project){
        boolean result;
        try {
            result = projectService.update(project);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", project);
        return RespBean.unprocessable("修改失败");
    }
}
