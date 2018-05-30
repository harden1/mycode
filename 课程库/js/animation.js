//javascript document

//导航二级菜单
$(".nav-show .menu-sub").mouseover(function() {
        $(this).find(".menu-con").show();
    }).mouseout(function() {
        $(this).find(".menu-con").hide();
    })
    //搜索
$(".search").click(function() {
        $(".searchbox").addClass("select");
        $(".close-btn").click(function() {
            $(".searchbox").removeClass("select");
        })
    })
    //横向视频列表
function lessonlist() {
    $(".lesson-list1 li").hover(function() {
        $(this).find(".lesson-infor").css("height", "175px").children("p").show().css({
            "height": "52px",
            "opacity": "1",
            "filter": "alpha(opacity=100)",
            "-moz-opacity": "1",
            "-khtml-opacity": "1"
        });
        $(this).find(".lessonplay").css({
            "opacity": "1",
            "filter": "alpha(opacity=100)",
            "-moz-opacity": "1",
            "-khtml-opacity": "1"
        })
    }, function() {
        $(this).find(".lesson-infor").css("height", "88px").children("p").show().removeAttr("style");
        $(this).find(".lessonplay").removeAttr("style");
    });
}
lessonlist();
//视频列表页展示切换
$(".previewMode ul li").click(function() {
        var num = $(this).index();
        if (num == 0) {
            $("#lesson-list").removeClass("lesson-list").addClass("lesson-list1");
            lessonlist();
        } else {
            $("#lesson-list").removeClass("lesson-list1").addClass("lesson-list");
            //竖向视频列表
            $(".lesson-list ul li").unbind().bind().mouseover(function() {
                $(this).find(".lessonplay").addClass("on");
                return false;
            }).mouseout(function() {
                $(this).find(".lessonplay").removeClass("on");
                return false;
            });
        }
    })
    //滚动到顶部
$(".top").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
})