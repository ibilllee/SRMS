package com.bill.srms.controller;

import com.bill.srms.pojo.ResearchStudio;
import com.bill.srms.pojo.RespBean;
import com.bill.srms.service.StudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
			result=studioService.addStudio(studio);
		} catch (Exception e){
			return RespBean.unprocessable("研究室创建失败"+e.getMessage(), studio);
		}
		if (result)
			return RespBean.created("研究室创建成功", studio);
		return RespBean.unprocessable("研究室创建失败", studio);
	}
}
