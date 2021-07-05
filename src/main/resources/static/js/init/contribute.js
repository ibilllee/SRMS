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
            if (confirm("新增科研者贡献信息？")) {
                $.post("contribute/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "contribute.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "contribute.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的科研者贡献信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'contribute/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "contribute.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "contribute.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "contribute.html";
                    }
                })
            }
        }
    });

    $("#achievementId").blur(function () {
        var achievementId = $(this).val();
        $.get("achievement/get/" + achievementId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind2"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind2"), "该编号对应的成果不存在");
            } else {
                displayInfo($("#successFind2"), "验证成果失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    //获取结果列表
    $.get("contribute/getAll", function (result) {
        var contributeList = result.data.contributeList;

        for (i = 0; i < contributeList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + contributeList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + contributeList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + contributeList[i].researcherId + "</td>" +
                "<td style='vertical-align:middle'>" + contributeList[i].researcherName + "</td>" +
                "<td style='vertical-align:middle'>" + contributeList[i].achievementId + "</td>" +
                "<td style='vertical-align:middle'>" + contributeList[i].achievementName + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + contributeList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + contributeList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            $("#researcherId").attr("value", "");
            $("#achievementId").attr("value", "");
            document.getElementById("researcherId").value="";
            document.getElementById("achievementId").value="";
        });


        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var researcherId = father.children().eq(1).html();
            var achievementId = father.children().eq(3).html();

            $("#id").attr("placeholder", id);
            document.getElementById("researcherId").value=researcherId;
            document.getElementById("achievementId").value=achievementId;
            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的科研者贡献信息？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'contribute/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "contribute.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "contribute.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "contribute.html";
                    }
                });
            }
        });
    });
})