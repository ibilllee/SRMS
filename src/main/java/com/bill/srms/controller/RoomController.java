package com.bill.srms.controller;

import com.bill.srms.pojo.RespBean;
import com.bill.srms.pojo.Room;
import com.bill.srms.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    public RespBean add(Room room) {
        boolean result;
        try {
            result = roomService.add(room);
        } catch (Exception e) {
            return RespBean.unprocessable("添加失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("添加成功", room);
        return RespBean.unprocessable("添加失败");
    }

    @GetMapping("/getAll")
    public RespBean getAll(){
        HashMap<String, List<Room>> result = new HashMap<>();
        try {
            result.put("roomList", roomService.getAll());
        }catch (Exception e) {
            return RespBean.unprocessable("添加失败" + e.getMessage());
        }
        return RespBean.ok("获取成功",result);
    }

    @DeleteMapping("/delete/{id}")
    public RespBean delete(@PathVariable Integer id){
        boolean result;
        try {
            result=roomService.delete(id);
        }catch (Exception e){
            return RespBean.unprocessable("删除失败"+e.getMessage());
        }
        if (result)
            return RespBean.ok("删除成功");
        return RespBean.unprocessable("删除失败");
    }

    @PutMapping("/update")
    public RespBean update(Room room){
        boolean result;
        try {
            result = roomService.update(room);
        } catch (Exception e) {
            return RespBean.unprocessable("修改失败" + e.getMessage());
        }
        if (result)
            return RespBean.ok("修改成功", room);
        return RespBean.unprocessable("修改失败");
    }
}
