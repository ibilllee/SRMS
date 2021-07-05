$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    // 失焦检查 -> 编辑表单中要检查的元素
    $("#studioId").blur(function () {
        var studioId = $(this).val();
        $.get("studio/get/" + studioId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind1"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind1"), "该编号对应的工作室不存在");
            } else {
                displayInfo($("#successFind1"), "验证工作室失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增工作地点？")) {
                $.post("room/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "room.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "room.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的工作地点？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'room/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "room.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "room.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "room.html";
                    }
                })
            }
        }
    });

    //获取结果列表
    $.get("room/getAll", function (result) {
        var roomList = result.data.roomList;
        for (i = 0; i < roomList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + roomList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + roomList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + roomList[i].address + "</td>" +
                "<td style='vertical-align:middle'>" + roomList[i].acreage + "</td>" +
                "<td style='vertical-align:middle'>" + roomList[i].studioId + "</td>" +
                "<td style='vertical-align:middle'>" + roomList[i].studioName + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + roomList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + roomList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("address").value="";
            document.getElementById("acreage").value="";
            document.getElementById("studioId").value="";
        });

        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var address = father.children().eq(1).html();
            var acreage = father.children().eq(2).html();
            var studioId = father.children().eq(3).html();
            $("#id").attr("placeholder", id);
            document.getElementById("address").value=address;
            document.getElementById("acreage").value=acreage;
            document.getElementById("studioId").value=studioId;

            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的工作地点？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'room/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "room.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "room.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "room.html";
                    }
                });
            }
        });
    });
})