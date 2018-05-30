//导航栏设置宽度
$(document).ready(function () {
        var navWidth = $("body").width();
        $("#menus li").each(function (index, value) {
            if ($(this).find("a").text().split('').length > 2) {
                $(this).width(navWidth / 3);
            } else {
                $(this).width(navWidth / 6);
            }
        })
        refreshNews("精选");
        $("#menus a").click(function () {
            var type = $(this).text();
            $(this).parent().addClass("select").siblings().removeClass("select");
            refreshNews(type);
        })
    })
    //刷新页面内容
function refreshNews(type) {
    $("#news").empty();
    //    加载新闻
    $.ajax({
        url: '../server/news.php',
        type: 'get',
        datatype: 'json',
        data: {
            newstype: type
        },
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var str = '<li><a href=""><img src="' + data[i].newsimg + '" alt=""><div class="list-main"><h3>' + data[i].newstitle + '</h3><p><span>' + data[i].newstime + '</span><b>' + data[i].newstype + '</b></p></div></a></li>';
                $("#news").append(str);
            }
        }
    })
}