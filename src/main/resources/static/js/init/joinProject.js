$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    // 失焦检查 -> 编辑表单中要检查的元素
    $("#researcherId").blur(function () {
        var researcherId = $(this).val();
        $.get("researcher/get/" + researcherId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind1"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind1"), "该编号对应的科研者不存在");
            } else {
                displayInfo($("#successFind1"), "验证科研者失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增项目参与信息？")) {
                $.post("joinProject/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "joinProject.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "joinProject.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的项目参与信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'joinProject/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "joinProject.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "joinProject.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "joinProject.html";
                    }
                })
            }
        }
    });

    $("#projectId").blur(function () {
        var projectId = $(this).val();
        $.get("project/get/" + projectId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind2"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind2"), "该编号对应的项目不存在");
            } else {
                displayInfo($("#successFind2"), "验证成果失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    //获取结果列表
    $.get("joinProject/getAll", function (result) {
        var joinProjectList = result.data.joinProjectList;

        for (i = 0; i < joinProjectList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + joinProjectList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].researcherId + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].researcherName + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].projectId + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].projectName + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].subTopicId + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].joinTime + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].workload + "</td>" +
                "<td style='vertical-align:middle'>" + joinProjectList[i].fund + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + joinProjectList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + joinProjectList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("researcherId").value="";
            document.getElementById("projectId").value="";
            document.getElementById("subTopicId").value="";
            document.getElementById("joinTime").value="";
            document.getElementById("workload").value="";
            document.getElementById("fund").value="";
        });


        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var researcherId = father.children().eq(1).html();
            var projectId = father.children().eq(3).html();
            var subTopicId = father.children().eq(5).html();
            var joinTime = father.children().eq(6).html();
            var workload = father.children().eq(7).html();
            var fund = father.children().eq(8).html();

            $("#id").attr("placeholder", id);
            document.getElementById("researcherId").value=researcherId;
            document.getElementById("projectId").value=projectId;
            document.getElementById("subTopicId").value=subTopicId;
            document.getElementById("joinTime").value=joinTime;
            document.getElementById("workload").value=workload;
            document.getElementById("fund").value=fund;

            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的项目参与信息？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'joinProject/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "joinProject.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "joinProject.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "joinProject.html";
                    }
                });
            }
        });
    });
})