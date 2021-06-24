package com.bill.srms.controller;

import com.bill.srms.pojo.Researcher;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.ResearcherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/researcher")
public class ResearcherController {
    @Autowired
    private ResearcherService researcherService;

    @PostMapping("/add")
    public RespBean add(Researcher researcher) {
        boolean result;
        try {
            result = researcherService.add(researcher);
        } catch (Exception e) {
            return RespBean.unprocessable("添加失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("添加成功", researcher);
        return RespBean.unprocessable("添加失败");
    }

    @GetMapping("/get/{id}")
    public RespBean get(@PathVariable Integer id){
        Researcher researcher;
        try {
            researcher=researcherService.getById(id);
        }catch (Exception e){
            return RespBean.unprocessable("获取失败");
        }
        if (researcher!=null)
            return RespBean.ok("获取成功",researcher);
        return RespBean.unprocessable("该科研者不存在");
    }

    @GetMapping("/getAll")
    private RespBean getAll(){
        HashMap<String, List<Researcher>> result = new HashMap<>();
        try {
            result.put("researcherList", researcherService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @GetMapping("/getByStudioId/{studioId}")
    private RespBean getByStudioId(@PathVariable Integer studioId){
        HashMap<String, List<Researcher>> result = new HashMap<>();
        try {
            result.put("researcherList", researcherService.getByStudioId(studioId));
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @GetMapping("/getByProjectId/{projectId}")
    private RespBean getByProjectId(@PathVariable Integer projectId){
        HashMap<String, List<Researcher>> result = new HashMap<>();
        try {
            result.put("researcherList", researcherService.getByProjectId(projectId));
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @GetMapping("/getBySubTopicId/{subTopicId}")
    private RespBean getBySubTopicId(@PathVariable Integer subTopicId){
        HashMap<String, List<Researcher>> result = new HashMap<>();
        try {
            result.put("researcherList", researcherService.getBySubTopicId(subTopicId));
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @GetMapping("/getByAchievementId/{achievementId}")
    private RespBean getByAchievementId(@PathVariable Integer achievementId){
        HashMap<String, List<Researcher>> result = new HashMap<>();
        try {
            result.put("researcherList", researcherService.getByAchievementId(achievementId));
        }catch (Exception e) {
            return RespBean.unprocessable("获取失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result= researcherService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Researcher researcher){
        boolean result;
        try {
            result = researcherService.update(researcher);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", researcher);
        return RespBean.unprocessable("修改失败");
    }
}
