package com.bill.srms.pojo;

import lombok.Data;

@Data
public class RespBean
{
	private Object data;
	private meta metaInfo;

	public RespBean(Object data) {
		this.data = data;
	}
	public RespBean(String msg, int status, Object data) {
		this.data = data;
		this.metaInfo=new meta(msg, status);
	}
	public RespBean(){ }

	public static RespBean build(){
		return new RespBean();
	}

	public static RespBean ok(String msg){
		return new RespBean(msg,200,null);
	}

	public static RespBean ok(String msg, Object obj) {
		return new RespBean(msg,200,obj);
	}

	public static RespBean created(String msg){
		return new RespBean(msg,201,null);
	}

	public static RespBean created(String msg, Object obj) {
		return new RespBean(msg,201,obj);
	}

	public static RespBean unprocessable(String msg){
		return new RespBean(msg,422,null);
	}

	public static RespBean unprocessable(String msg, Object obj) {
		return new RespBean(msg,422,obj);
	}


	public static RespBean error(String msg) {
		return new RespBean( msg,500, null);
	}

	public static RespBean error(String msg, Object obj) {
		return new RespBean(msg,500, obj);
	}

	public static RespBean get(String msg,int status,Object obj){
		return new RespBean(msg,status,obj);
	}
}
