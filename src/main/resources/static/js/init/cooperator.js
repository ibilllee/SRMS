$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增第三方机构信息？")) {
                $.post("cooperator/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "cooperator.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "cooperator.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的第三方机构信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'cooperator/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "cooperator.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "cooperator.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "cooperator.html";
                    }
                })
            }
        }
    });

    //获取结果列表
    $.get("cooperator/getAll", function (result) {
        var cooperatorList = result.data.cooperatorList;
        for (i = 0; i < cooperatorList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + cooperatorList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + cooperatorList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + cooperatorList[i].name + "</td>" +
                "<td style='vertical-align:middle'>" + cooperatorList[i].address + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + cooperatorList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + cooperatorList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("name").value="";
            document.getElementById("address").value="";
        });

        // //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var name = father.children().eq(1).html();
            var address = father.children().eq(2).html();
            $("#id").attr("placeholder", id);
            document.getElementById("name").value=name;
            document.getElementById("address").value=address;
            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的第三方机构？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'cooperator/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "cooperator.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "cooperator.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "cooperatetor.html";
                    }
                });
            }
        });
    });
})