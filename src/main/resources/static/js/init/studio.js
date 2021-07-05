$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增工作室？")) {
                $.post("studio/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "studio.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "studio.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的工作室信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'studio/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "studio.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "studio.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "studio.html";
                    }
                })
            }
        }
    });

    // 失焦检查 -> 编辑表单中要检查的元素
    $("#principalId").blur(function () {
        var principalId = $(this).val();
        $.get("researcher/get/" + principalId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind1"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind1"), "该编号对应的科研负责人不存在");
            } else {
                displayInfo($("#successFind1"), "验证负责人失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })
    $("#secretaryId").blur(function () {
        var secretaryId = $(this).val();
        $.get("secretary/get/" + secretaryId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind2"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind2"), "该编号对应的秘书不存在");
            } else {
                displayInfo($("#successFind2"), "验证负责人失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind2"));
    })

    //获取结果列表
    $.get("studio/getAll", function (result) {
        var studioList = result.data.studioList;
        for (i = 0; i < studioList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + studioList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + studioList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + studioList[i].name + "</td>" +
                "<td style='vertical-align:middle'>" + studioList[i].researchDirection + "</td>" +
                "<td style='vertical-align:middle;display: none'>" + studioList[i].principalId + "</td>" +
                "<td style='vertical-align:middle'>" + studioList[i].principalName + "</td>" +
                "<td style='vertical-align:middle'>" + studioList[i].pstartTime + "</td>" +
                "<td style='vertical-align:middle'>" + studioList[i].pterm + "</td>" +
                "<td style='vertical-align:middle;display: none'>" + studioList[i].secretaryId + "</td>" +
                "<td style='vertical-align:middle'>" + studioList[i].secretaryName + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default mbr' name='" + studioList[i].id + "'><span class='glyphicon glyphicon-th-list'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default loc' name='" + studioList[i].id + "'><span class='glyphicon glyphicon-th-list'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + studioList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + studioList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("name").value="";
            document.getElementById("researchDirection").value="";
            document.getElementById("principalId").value="";
            document.getElementById("pStartTime").value="";
            document.getElementById("pTerm").value="";
            document.getElementById("secretaryId").value="";
        });

        // 查询成员
        $("a.mbr").click(function () {
            var id = $(this).attr("name");
            $("#table2").html("<tr class='success' style='height:30px'>\n" +
                "<th style='vertical-align:middle;'>编号</th>\n" +
                "<th style='vertical-align:middle'>姓名</th>\n" +
                "<th style='vertical-align:middle'>性别</th>\n" +
                "<th style='vertical-align:middle'>职称</th>\n" +
                "<th style='vertical-align:middle'>年龄</th>\n" +
                "<th style='vertical-align:middle'>研究方向</th>\n" +
                "<th style='vertical-align:middle'>工作室编号</th>\n" +
                "<th style='vertical-align:middle'>工作室名称</th>\n" +
                "</tr>");

            $("#myModal2").modal("show");
            $.get("researcher/getByStudioId/" + id, function (result) {
                var researcherList = result.data.researcherList;
                for (i = 0; i < researcherList.length; i++) {
                    $("#table2").append(
                        "<tr class='col' style='height:30px' name='" + researcherList[i].id + "'>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].id + "</td>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].name + "</td>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].gender + "</td>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].title + "</td>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].age + "</td>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].researchDirection + "</td>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].studioId + "</td>" +
                        "<td style='vertical-align:middle'>" + researcherList[i].studioName + "</td>" +
                        "</tr>"
                    )
                }
            })
        })

        // 查询地点
        $("a.loc").click(function () {
            var id = $(this).attr("name");
            $("#table2").html("<tr class='success' style='height:30px'>\n" +
                "<th style='vertical-align:middle'>编号</th>" +
                "<th style='vertical-align:middle'>地址</th>" +
                "<th style='vertical-align:middle'>面积</th>" +
                "<th style='vertical-align:middle'>工作室序号</th>" +
                "<th style='vertical-align:middle'>工作室名称</th>" +
                "</tr>");

            $("#myModal2").modal("show");
            $.get("room/getByStudioId/" + id, function (result) {
                var roomList = result.data.roomList;
                for (i = 0; i < roomList.length; i++) {
                    $("#table2").append(
                        "<tr class='col' style='height:30px' name='" + roomList[i].id + "'>" +
                        "<td style='vertical-align:middle'>" + roomList[i].id + "</td>" +
                        "<td style='vertical-align:middle'>" + roomList[i].address + "</td>" +
                        "<td style='vertical-align:middle'>" + roomList[i].acreage + "</td>" +
                        "<td style='vertical-align:middle'>" + roomList[i].studioId + "</td>" +
                        "<td style='vertical-align:middle'>" + roomList[i].studioName + "</td>" +
                        "</tr>"
                    )
                }
            });
        })

        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var name = father.children().eq(1).html();
            var researchDirection = father.children().eq(2).html();
            var principalId = father.children().eq(3).html();
            var pStartTime = father.children().eq(5).html();
            var pTerm = father.children().eq(6).html();
            var secretaryId = father.children().eq(7).html();

            $("#id").attr("placeholder", id);
            document.getElementById("name").value=name;
            document.getElementById("researchDirection").value=researchDirection;
            document.getElementById("principalId").value=principalId;
            document.getElementById("pStartTime").value=pStartTime;
            document.getElementById("pTerm").value=pTerm;
            document.getElementById("secretaryId").value=secretaryId;

            $("#myModal").modal("show");
        });


        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的工作室？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'studio/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "studio.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "studio.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "studio.html";
                    }
                });
            }
        });
    });
})