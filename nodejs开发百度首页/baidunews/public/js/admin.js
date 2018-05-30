$(document).ready(function () {
    refreshNews();
    $("#btn-submit").click(function (e) {
            e.preventDefault();
            if ($("#newstitle").val() === "" || $("#newsimg").val() === "" || $("#newstime").val() === "" || $("#newssrc").val() === "") {
                if ($("#newstitle,#newsimg,#newstime,#newssrc").val() == "") {
                    $("#newstitle,#newsimg,#newstime,#newssrc").parent().addClass("has-error");
                } else {
                    $("#newstitle,#newsimg,#newstime,#newssrc").parent().removeClass("has-error");
                }
            } else {
                var jsonNews = {
                        newstitle: $("#newstitle").val(),
                        newstype: $("#newstype").val(),
                        newsimg: $("#newsimg").val(),
                        newstime: $("#newstime").val(),
                        newssrc: $("#newssrc").val()
                    }
                    //提交添加
                $.ajax({
                    url: '/admin/insert',
                    type: 'post',
                    data: jsonNews,
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        refreshNews();
                    }
                })
            }
        })
        //    删除新闻的功能
    var deleteId = null;
    $("#newstable tbody").on("click", ".btn-danger", function (e) {
        $("#Modalfirst").modal("show");
        deleteId = $(this).parent().prevAll().eq(5).html();
    })
    $("#confirmdelete").click(function () {
            if (deleteId) {
                $.ajax({
                    url: '/admin/delete',
                    type: 'post',
                    data: {
                        newsid: deleteId
                    },
                    success: function (data) {
                        console.log(data);
                        $("#Modalfirst").modal("hide");
                        refreshNews();
                    }
                })
            }
        })
        //    修改新闻的功能
    var UpdateId = null;
    $("#newstable tbody").on("click", ".btn-primary", function (e) {
        $("#updateModal").modal("show");
        UpdateId = $(this).parent().prevAll().eq(5).html();
        $.ajax({
            url: '/admin/curnews',
            type: 'get',
            jsonType: 'json',
            data: {
                newsid: UpdateId
            },
            success: function (data) {
                $("#Unewstitle").val(data[0].newstitle);
                $("#Unewstype").val(data[0].newstype);
                $("#Unewsimg").val(data[0].newsimg);
                $("#Unewssrc").val(data[0].newssrc);
                var utime = data[0].newstime.split("T")[0];
                $("#Unewstime").val(utime);
            }
        })
    })
    $("#confirmUpdate").click(function (e) {
            $.ajax({
                url: '/admin/update',
                type: 'post',
                data: {
                    newstitle: $('#Unewstitle').val(),
                    newstype: $('#Unewstype').val(),
                    newsimg: $('#Unewsimg').val(),
                    newstime: $('#Unewstime').val(),
                    newssrc: $('#Unewssrc').val(),
                    id: UpdateId
                },
                success: function (data) {
                    $("#updateModal").modal("hide");
                    refreshNews();
                }
            })
        })
        //对数组大小进行排列
    function sortNumber(a, b) {
        return a - b
    }
    //    清空新闻
    function refreshNews() {
        //empty table
        $("#newstable tbody").empty();
        $.ajax({
            url: '/admin/getnews',
            type: 'get',
            datatype: 'json',
            success: function (data) {
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i].id);
                }
                arr = arr.sort(sortNumber);
                for (var k = 0; k < arr.length; k++) {
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].id === arr[k]) {
                            var str = '<tr><td>' + arr[k] + '</td><td>' + data[j].newstype + '</td><td>' + data[j].newstitle + '</td><td>' + data[j].newsimg + '</td><td>' + data[j].newssrc + '</td><td>' + data[j].newstime.split("T")[0] + '</td><td><button class="btn btn-primary btn-xs">编辑</button><button class="btn  btn-xs btn-danger" id="btn-danger">删除</button></td></tr>';
                            $("#newstable tbody").append(str);
                        }
                    }
                }
            },
            error: function (e) {
                console.log(e);
            }
        })
    }
})