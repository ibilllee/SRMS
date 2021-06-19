package com.bill.srms.controller;

import com.bill.srms.pojo.ResearchStudio;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.StudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/studio")
public class StudioController
{
	@Autowired
	private StudioService studioService;

	@PostMapping("/add")
	public RespBean add(ResearchStudio studio){
		boolean result ;
		try {
			result=studioService.add(studio);
		} catch (Exception e){
			return RespBean.unprocessable("研究室创建失败"+e.getMessage(), studio);
		}
		if (result)
			return RespBean.ok("研究室创建成功", studio);
		return RespBean.unprocessable("研究室创建失败", studio);
	}

	@GetMapping("/get/{id}")
	public RespBean get(@PathVariable Integer id){
		ResearchStudio studio;
		try {
			studio=studioService.getById(id);
		}catch (Exception e){
			return RespBean.unprocessable("获取失败");
		}
		if (studio!=null)
			return RespBean.ok("获取成果",studio);
		return RespBean.unprocessable("该工作室不存在");
	}

	@GetMapping("/getAll")
	public RespBean getAll(){
		HashMap<String, List<ResearchStudio>> result = new HashMap<>();
		try {
			result.put("studioList", studioService.getAll());
		}catch (Exception e) {
			return RespBean.unprocessable("获取失败" + e.getMessage());
		}
		return RespBean.ok("获取成功",result);
	}

	@DeleteMapping("/delete/{id}")
	public RespBean delete(@PathVariable Integer id){
		boolean result;
		try {
			result=studioService.delete(id);
		}catch (Exception e){
			return RespBean.unprocessable("删除失败"+e.getMessage());
		}
		if (result)
			return RespBean.ok("删除成功");
		return RespBean.unprocessable("删除失败");
	}

	@PutMapping("/update")
	public RespBean update(ResearchStudio studio){
		boolean result;
		try {
			result = studioService.update(studio);
		} catch (Exception e) {
			return RespBean.unprocessable("修改失败" + e.getMessage());
		}
		if (result)
			return RespBean.ok("修改成功", studio);
		return RespBean.unprocessable("修改失败");
	}
}
