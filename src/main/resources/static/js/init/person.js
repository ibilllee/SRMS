$(function () {
    $.get("header.html", function (data) {
        $("#header").html(data);
    });

    $("#submitBtn").click(function () {
        if ($("#id").attr("placeholder") === '自动生成') {
            if (confirm("新增第三方联系人信息？")) {
                $.post("person/add", $("#changeForm").serialize(), function (result) {
                    if (result.metaInfo.status === 200) {
                        alert("添加成功");
                        location.href = "person.html";
                    } else {
                        alert("添加失败\n信息：" + result.metaInfo.msg);
                        location.href = "person.html";
                    }
                });
            }
        }else {
            var id=$("#id").attr("placeholder");
            if (confirm("修改编号为" + id + "的第三方联系人信息？")) {
                $("#id").removeAttr("disabled");
                $("#id").attr("value", id);
                $.ajax({
                    type: 'PUT',
                    url: 'person/update',
                    data: $("#changeForm").serialize(),
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("修改成功");
                            location.href = "person.html";
                        } else {
                            alert("修改失败\n信息：" + result.metaInfo.msg);
                            location.href = "person.html";
                        }
                    },
                    error: function (result) {
                        alert("修改失败");
                        location.href = "person.html";
                    }
                })
            }
        }
    });

    //获取结果列表
    $.get("person/getAll", function (result) {
        var personList = result.data.personList;
        for (i = 0; i < personList.length; i++) {
            $("#table").append(
                "<tr class='col' name='" + personList[i].id + "'>" +
                "<td style='vertical-align:middle'>" + personList[i].id + "</td>" +
                "<td style='vertical-align:middle'>" + personList[i].name + "</td>" +
                "<td style='vertical-align:middle'>" + personList[i].mail + "</td>" +
                "<td style='vertical-align:middle'>" + personList[i].officePhone + "</td>" +
                "<td style='vertical-align:middle'>" + personList[i].mobilePhone + "</td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default upd' name='" + personList[i].id + "'><span class='glyphicon glyphicon-open'></span></a></td>" +
                "<td style='vertical-align:middle'><a class='btn btn-sm btn-default del' name='" + personList[i].id + "'><span class='glyphicon glyphicon-trash'></span></a></td>" +
                "</tr>"
            )
        }

        //新增
        $("#addBtn").click(function () {
            $("#myModal").modal("show");
            $("#id").attr("placeholder", "自动生成");
            document.getElementById("name").value="";
            document.getElementById("mail").value="";
            document.getElementById("officePhone").value="";
            document.getElementById("mobilePhone").value="";

        });

        // //修改
        $("a.upd").click(function () {
            var id = $(this).attr("name");

            //查询表格，属性回填
            var father = $("[name='" + id + "']");
            var name = father.children().eq(1).html();
            var mail = father.children().eq(2).html();
            var officePhone = father.children().eq(3).html();
            var mobilePhone = father.children().eq(4).html();
            $("#id").attr("placeholder", id);
            document.getElementById("name").value=name;
            document.getElementById("mail").value=mail;
            document.getElementById("officePhone").value=officePhone;
            document.getElementById("mobilePhone").value=mobilePhone;

            $("#myModal").modal("show");
        });

        //删除
        $("a.del").click(function () {
            var id = $(this).attr("name");
            if (confirm("删除编号为" + id + "的第三方联系人？")) {
                $.ajax({
                    type: 'DELETE',
                    url: 'person/delete/' + id,
                    success: function (result) {
                        if (result.metaInfo.status === 200) {
                            alert("删除成功");
                            location.href = "person.html";
                        } else {
                            alert("删除失败\n信息：" + result.metaInfo.msg);
                            location.href = "person.html";
                        }
                    },
                    error: function (result) {
                        alert("删除失败");
                        location.href = "person.html";
                    }
                });
            }
        });
    });
})