$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增秘书信息？")) {
                $.post("secretary/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "secretary.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "secretary.html";
                    }
                });
            }
        } else {
            var id = $("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的秘书信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'secretary/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "secretary.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "secretary.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "secretary.html";
                    }
                })
            }
        }
    });


    //获取结果列表
    $.get("secretary/getAll", function (result) {
        var secretaryList = result.data.secretaryList;
        for (i = 0; i < secretaryList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + secretaryList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + secretaryList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + secretaryList[i].name + "</td>" +
                "<td style='vertical-align:middle'>" + secretaryList[i].gender + "</td>" +
                "<td style='vertical-align:middle'>" + secretaryList[i].age + "</td>" +
                "<td style='vertical-align:middle'>" + secretaryList[i].employTime + "</td>" +
                "<td style='vertical-align:middle'>" + secretaryList[i].duty + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + secretaryList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + secretaryList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("name").value="";
            document.getElementById("gender").value="";
            document.getElementById("age").value="";
            document.getElementById("employTime").value="";
            document.getElementById("duty").value="";
        });

        // //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var name = father.children().eq(1).html();
            var gender = father.children().eq(2).html();
            var age = father.children().eq(3).html();
            var employTime = father.children().eq(4).html();
            var duty = father.children().eq(5).html();
            $("#id").attr("placeholder", id);
            if (gender === "女") {
                $("[name='man']").removeAttr("selected");
                $("[name='woman']").attr("selected", true);
            } else {
                $("[name='woman']").removeAttr("selected");
                $("[name='man']").attr("selected", true);
            }
            document.getElementById("name").value=name;
            document.getElementById("age").value=age;
            document.getElementById("employTime").value=employTime;
            document.getElementById("duty").value=duty;

            $("#myModal").modal("show");

        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的秘书？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'secretary/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "secretary.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "secretary.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "secretary.html";
                    }
                });
            }
        });
    });
})