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
            if (confirm("新增科研者？")) {
                $.post("researcher/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "researcher.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "researcher.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的科研者信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'researcher/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "researcher.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "researcher.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "researcher.html";
                    }
                })
            }
        }
    });

    //获取结果列表
    $.get("researcher/getAll", function (result) {
        var researcherList = result.data.researcherList;

        for (i = 0; i < researcherList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + researcherList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + researcherList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + researcherList[i].name + "</td>" +
                "<td style='vertical-align:middle'>" + researcherList[i].gender + "</td>" +
                "<td style='vertical-align:middle'>" + researcherList[i].title + "</td>" +
                "<td style='vertical-align:middle'>" + researcherList[i].age + "</td>" +
                "<td style='vertical-align:middle'>" + researcherList[i].researchDirection + "</td>" +
                "<td style='vertical-align:middle'>" + researcherList[i].studioId + "</td>" +
                "<td style='vertical-align:middle'>" + researcherList[i].studioName + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + researcherList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + researcherList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("name").value="";
            document.getElementById("gender").value="";
            document.getElementById("title").value="";
            document.getElementById("age").value="";
            document.getElementById("researchDirection").value="";
            document.getElementById("studioId").value="";

        });

        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");
            //查询表格，属性回填
            var father = $("[name='" + id + "']");

            var name = father.children().eq(1).html();
            var gender = father.children().eq(2).html();
            var title = father.children().eq(3).html();
            var age = father.children().eq(4).html();
            var researchDirection = father.children().eq(5).html();
            var studioId = father.children().eq(6).html();
            $("#id").attr("placeholder", id);
            document.getElementById("name").value=name;
            if (gender === "女") {
                $("[name='man']").removeAttr("selected");
                $("[name='woman']").attr("selected", true);
            } else {
                $("[name='woman']").removeAttr("selected");
                $("[name='man']").attr("selected", true);
            }
            document.getElementById("title").value=title;
            document.getElementById("age").value=age;
            document.getElementById("researchDirection").value=researchDirection;
            document.getElementById("studioId").value=studioId;
            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的科研者信息？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'researcher/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "researcher.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "researcher.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "researcher.html";
                    }
                });
            }
        });
    });
})