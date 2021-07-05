$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
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

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增科研项目？")) {
                $.post("project/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "project.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "project.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的科研项目？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'project/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "project.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "project.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "project.html";
                    }
                })
            }
        }
    });

    //获取结果列表
    $.get("project/getAll", function (result) {
        var projectList = result.data.projectList;
        for (i = 0; i < projectList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + projectList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + projectList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + projectList[i].name + "</td>" +
                "<td style='vertical-align:middle'>" + projectList[i].principalId + "</td>" +
                "<td style='vertical-align:middle'>" + projectList[i].principalName + "</td>" +
                "<td style='vertical-align:middle'>" + projectList[i].researchContent + "</td>" +
                "<td style='vertical-align:middle'>" + projectList[i].fund + "</td>" +
                "<td style='vertical-align:middle'>" + projectList[i].startTime + "</td>" +
                "<td style='vertical-align:middle'>" + projectList[i].finishTime + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default mbr' name='" + projectList[i].id + "'><span class='glyphicon glyphicon-th-list'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default sub' name='" + projectList[i].id + "'><span class='glyphicon glyphicon-th-list'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + projectList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + projectList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("name").value="";
            document.getElementById("principalId").value="";
            document.getElementById("researchContent").value="";
            document.getElementById("fund").value="";
            document.getElementById("startTime").value="";
            document.getElementById("finishTime").value="";
        });

        //查询成员
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
            $.get("researcher/getByProjectId/" + id, function (result) {
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

        // 查询子课题
        $("a.sub").click(function () {
            var id = $(this).attr("name");
            $("#table2").html("<tr class='success' style='height:30px'>\n" +
                "<th style='vertical-align:middle'>编号</th>" +
                "<th style='vertical-align:middle'>完成时间</th>" +
                "<th style='vertical-align:middle'>经费</th>" +
                "<th style='vertical-align:middle'>技术指标</th>" +
                "<th style='vertical-align:middle'>负责人编号</th>" +
                "<th style='vertical-align:middle'>负责人</th>" +
                "</tr>");

            $("#myModal2").modal("show");
            $.get("subTopic/getByProjectId/" + id, function (result) {
                var subTopicList = result.data.subTopicList;
                for (i = 0; i < subTopicList.length; i++) {
                    $("#table2").append(
                        "<tr class='col' style='height:30px' name='" + subTopicList[i].id + "'>" +
                        "<td style='vertical-align:middle'>" + subTopicList[i].id + "</td>" +
                        "<td style='vertical-align:middle'>" + subTopicList[i].finishTime + "</td>" +
                        "<td style='vertical-align:middle'>" + subTopicList[i].fund + "</td>" +
                        "<td style='vertical-align:middle'>" + subTopicList[i].techIndex + "</td>" +
                        "<td style='vertical-align:middle'>" + subTopicList[i].principalId + "</td>" +
                        "<td style='vertical-align:middle'>" + subTopicList[i].principalName + "</td>" +
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
            var principalId = father.children().eq(2).html();
            var researchContent = father.children().eq(4).html();
            var fund = father.children().eq(5).html();
            var startTime = father.children().eq(6).html();
            var finishTime = father.children().eq(7).html();

            $("#id").attr("placeholder", id);
            document.getElementById("name").value=name;
            document.getElementById("principalId").value=principalId;
            document.getElementById("researchContent").value=researchContent;
            document.getElementById("fund").value=fund;
            document.getElementById("startTime").value=startTime;
            document.getElementById("finishTime").value=finishTime;

            $("#myModal").modal("show");
        });


        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的科研项目？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'project/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "project.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "project.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "project.html";
                    }
                });
            }
        });
    });
})