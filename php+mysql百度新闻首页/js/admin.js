$(document).ready(function() {
    refreshNews();
    $("#btn-submit").click(function(e) {
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
                    url: '../server/insert.php',
                    type: 'post',
                    data: jsonNews,
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                        refreshNews();
                    }
                })
            }
        })
        //    删除新闻的功能
    var deleteId = null;
    $("#newstable tbody").on("click", ".btn-danger", function(e) {
        $("#Modalfirst").modal("show");
        deleteId = $(this).parent().prevAll().eq(5).html();
    })
    $("#confirmdelete").click(function() {
            if (deleteId) {
                $.ajax({
                    url: '../server/delete.php',
                    type: 'post',
                    data: {
                        newsid: deleteId
                    },
                    success: function(data) {
                        console.log(data);
                        $("#Modalfirst").modal("hide");
                        refreshNews();
                    }
                })
            }
        })
        //    修改新闻的功能
    var UpdateId = null;
    $("#newstable tbody").on("click", ".btn-primary", function(e) {
        $("#updateModal").modal("show");
        UpdateId = $(this).parent().prevAll().eq(5).html();
        $.ajax({
            url: '../server/curnews.php',
            type: 'get',
            jsonType: 'json',
            data: {
                newsid: UpdateId
            },
            success: function(data) {
                $("#Unewstitle").val(data[0].newstitle);
                $("#Unewstype").val(data[0].newstype);
                $("#Unewsimg").val(data[0].newsimg);
                $("#Unewssrc").val(data[0].newssrc);
                var utime=data[0].newstime.split(" ")[0];
                $("#Unewstime").val(utime);
            }
        })
    })
    $("#confirmUpdate").click(function(e) {
         $.ajax({
             url:'../server/update.php',
             type:'post',
             data:{
                 newstitle:$('#Unewstitle').val(),
                 newstype:$('#Unewstype').val(),
                 newsimg:$('#Unewsimg').val(),
                 newstime:$('#Unewstime').val(),
                 newssrc:$('#Unewssrc').val(),
                 id:UpdateId
             },
             success:function(data){
                 $("#updateModal").modal("hide");
                 refreshNews();
             }
         })
    })
        //    清空新闻
    function refreshNews() {
        //empty table
        $("#newstable tbody").empty();
        $.ajax({
            url: '../server/news.php',
            type: 'get',
            datatype: 'json',
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    var str = '<tr><td>' + data[i].id + '</td><td>' + data[i].newstype + '</td><td>' + data[i].newstitle + '</td><td>' + data[i].newsimg + '</td><td>' + data[i].newssrc + '</td><td>' + data[i].newstime + '</td><td><button class="btn btn-primary btn-xs">编辑</button><button class="btn  btn-xs btn-danger" id="btn-danger">删除</button></td></tr>';
                    $("#newstable tbody").append(str);
                }
            },
            error:function(e){
                console.log(e);
            }
        })
    }
})