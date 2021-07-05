$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    // 失焦检查 -> 编辑表单中要检查的元素
    $("#cooperatorId").blur(function () {
        var cooperatorId = $(this).val();
        $.get("cooperator/get/" + cooperatorId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind1"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind1"), "该编号对应的机构不存在");
            } else {
                displayInfo($("#successFind1"), "验证机构失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    $("#personId").blur(function () {
        var personId = $(this).val();
        $.get("person/get/" + personId, function (result) {
            if (result.metaInfo.status === 200) {
                displayInfo($("#successFind2"), "您填入了: " + result.data.name);
            } else if (result.metaInfo.msg === "不存在") {
                displayInfo($("#successFind2"), "该编号对应的联系人不存在");
            } else {
                displayInfo($("#successFind2"), "验证联系人失败");
            }
        })
    });
    $("#closeModal").click(function () {
        undisplay($("#successFind1"));
    })

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增机构-联系人信息？")) {
                $.post("perCoo/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "perCoo.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "perCoo.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的机构-联系人信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'perCoo/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "perCoo.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "perCoo.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "perCoo.html";
                    }
                })
            }
        }
    });

    //获取结果列表
    $.get("perCoo/getAll", function (result) {
        var perCooList = result.data.perCooList;

        for (i = 0; i < perCooList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + perCooList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + perCooList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + perCooList[i].cooperatorId + "</td>" +
                "<td style='vertical-align:middle'>" + perCooList[i].cooperatorName + "</td>" +
                "<td style='vertical-align:middle'>" + perCooList[i].personId + "</td>" +
                "<td style='vertical-align:middle'>" + perCooList[i].personName + "</td>" +
                "<td style='vertical-align:middle'>" + perCooList[i].type + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + perCooList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + perCooList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("cooperatorId").value="";
            document.getElementById("personId").value="";
        });


        //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var cooperatorId = father.children().eq(1).html();
            var personId = father.children().eq(3).html();
            var type = father.children().eq(4).html();

            $("#id").attr("placeholder", id);
            document.getElementById("cooperatorId").value=cooperatorId;
            $("#personId").attr("value", personId);
            if (type === "联系人") {
                $("[name='联系人']").attr("selected", true);
            } else {
                $("[name='负责人']").attr("selected", true);
            }


            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的机构-联系人信息？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'perCoo/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "perCoo.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "perCoo.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "perCoo.html";
                    }
                });
            }
        });
    });
})