$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增项目-机构信息？")) {
                $.post("withOther/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "withOther.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "withOther.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的项目-机构信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'withOther/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "withOther.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "withOther.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "withOther.html";
                    }
                })
            }
        }
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
                displayInfo($("#successFind1"), "验证联系人失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })


    $("#cooperatorId").blur(function () {
        var cooperatorId = $(this).val();
        $.get("cooperator/get/" + cooperatorId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind2"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind2"), "该编号对应的机构不存在");
            } else {
                displayInfo($("#successFind2"), "验证机构失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    //获取结果列表
    $.get("withOther/getAll", function (result) {
        var withOtherList = result.data.withOtherList;

        for (i = 0; i < withOtherList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + withOtherList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + withOtherList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + withOtherList[i].projectId + "</td>" +
                "<td style='vertical-align:middle'>" + withOtherList[i].projectName + "</td>" +
                "<td style='vertical-align:middle'>" + withOtherList[i].cooperatorId + "</td>" +
                "<td style='vertical-align:middle'>" + withOtherList[i].cooperatorName + "</td>" +
                "<td style='vertical-align:middle'>" + withOtherList[i].type + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + withOtherList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + withOtherList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("projectId").value="";
            document.getElementById("cooperatorId").value="";
        });


        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var projectId = father.children().eq(1).html();
            var cooperatorId = father.children().eq(3).html();
            var type = father.children().eq(4).html();

            $("#id").attr("placeholder", id);
            document.getElementById("projectId").value=projectId;
            document.getElementById("cooperatorId").value=cooperatorId;
            if (type === "合作方") {
                $("[name='合作方']").attr("selected", true);
            } else if (type === "委托方") {
                $("[name='委托方']").attr("selected", true);
            } else {
                $("[name='质量监测方']").attr("selected", true);
            }

            $("#myModal").modal("show");

        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的项目-机构信息？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'withOther/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "withOther.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "withOther.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "withOther.html";
                    }
                });
            }
        });
    });
})