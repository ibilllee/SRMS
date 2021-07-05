$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增子课题？")) {
                $.post("subTopic/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "subTopic.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "subTopic.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的子课题信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'subTopic/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "subTopic.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "subTopic.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "subTopic.html";
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

    $("#projectId").blur(function () {
        var projectId = $(this).val();
        $.get("project/get/" + projectId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind2"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind2"), "该编号对应的项目不存在");
            } else {
                displayInfo($("#successFind2"), "验证项目失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind2"));
    })

    //获取结果列表
    $.get("subTopic/getAll", function (result) {
        var subTopicList = result.data.subTopicList;
        for (i = 0; i < subTopicList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + subTopicList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].finishTime + "</td>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].fund + "</td>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].techIndex + "</td>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].principalId + "</td>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].principalName + "</td>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].projectId + "</td>" +
                "<td style='vertical-align:middle'>" + subTopicList[i].projectName + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default mbr' name='" + subTopicList[i].id + "'><span class='glyphicon glyphicon-th-list'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + subTopicList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + subTopicList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("finishTime").value="";
            document.getElementById("fund").value="";
            document.getElementById("techIndex").value="";
            document.getElementById("principalId").value="";
            document.getElementById("projectId").value="";
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
            $.get("researcher/getBySubTopicId/" + id, function (result) {
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


        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var finishTime = father.children().eq(1).html();
            var fund = father.children().eq(2).html();
            var techIndex = father.children().eq(3).html();
            var principalId = father.children().eq(4).html();
            var projectId = father.children().eq(6).html();

            $("#id").attr("placeholder", id);
            document.getElementById("finishTime").value=finishTime;
            document.getElementById("fund").value=fund;
            document.getElementById("techIndex").value=techIndex;
            document.getElementById("principalId").value=principalId;
            document.getElementById("projectId").value=projectId;

            $("#myModal").modal("show");
        });


        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的子课题？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'subTopic/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "subTopic.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "subTopic.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "subTopic.html";
                    }
                });
            }
        });
    });
})