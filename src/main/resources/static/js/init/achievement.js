$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    // 失焦检查 -> 编辑表单中要检查的元素
    $("#projectId").blur(function () {
        var projectId = $(this).val();
        $.get("project/get/" + projectId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind1"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind1"), "该编号对应的项目不存在");
            } else {
                displayInfo($("#successFind1"), "验证项目失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增成果？")) {
                $.post("achievement/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "achievement.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "achievement.html";
                    }
                });
            }
        } else {
            var id = $("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的成果信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'achievement/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "achievement.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "achievement.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "achievement.html";
                    }
                })
            }
        }
    });

    //获取结果列表
    $.get("achievement/getAll", function (result) {
        var achievementList = result.data.achievementList;

        for (i = 0; i < achievementList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + achievementList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + achievementList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + achievementList[i].name + "</td>" +
                "<td style='vertical-align:middle'>" + achievementList[i].time + "</td>" +
                "<td style='vertical-align:middle'>" + achievementList[i].rankId + "</td>" +
                "<td style='vertical-align:middle'>" + achievementList[i].type + "</td>" +
                "<td style='vertical-align:middle'>" + achievementList[i].projectId + "</td>" +
                "<td style='vertical-align:middle'>" + achievementList[i].projectName + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default mbr' name='" + achievementList[i].id + "'><span class='glyphicon glyphicon-th-list'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + achievementList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + achievementList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("name").value = "";
            document.getElementById("time").value = "";
            document.getElementById("rankId").value = "";
            document.getElementById("projectId").value = "";
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
            $.get("researcher/getByAchievementId/" + id, function (result) {
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
            var name = father.children().eq(1).html();
            var time = father.children().eq(2).html();
            var rankId = father.children().eq(3).html();
            var type = father.children().eq(4).html();
            var projectId = father.children().eq(5).html();

            $("#id").attr("placeholder", id);
            document.getElementById("name").value = name;
            document.getElementById("time").value = time;
            document.getElementById("rankId").value = rankId;
            $("#projectId").attr("value", projectId);
            if (type === "专利：发明") {
                $("[name='invention']").attr("selected", true);
            } else if (type === "专利：实用新型") {
                $("[name='utilityModel']").attr("selected", true);
            } else if (type === "专利：外观") {
                $("[name='exterior']").attr("selected", true);
            } else if (type === "论文") {
                $("[name='paper']").attr("selected", true);
            } else {
                $("[name='softwareCopyright']").attr("selected", true);
            }

            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的科研者信息？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'achievement/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "achievement.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "achievement.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "achievement.html";
                    }
                });
            }
        });
    });
})
