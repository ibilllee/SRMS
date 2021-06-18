package com.bill.srms.controller;

import com.bill.srms.pojo.ResearchStudio;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.StudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/studio")
public class StudioController
{
	@Autowired
	private StudioService studioService;

	@PostMapping
	public RespBean addStudio(ResearchStudio studio){
		boolean result ;
		try {
			result=studioService.add(studio);
		} catch (Exception e){
			return RespBean.unprocessable("研究室创建失败"+e.getMessage(), studio);
		}
		if (result)
			return RespBean.created("研究室创建成功", studio);
		return RespBean.unprocessable("研究室创建失败", studio);
	}

	@GetMapping("/get/{id}")
	public RespBean getStudio(@PathVariable Integer id){
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
}
